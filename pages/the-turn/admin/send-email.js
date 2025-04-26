import React from "react";
import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layouts/AdminLayout";
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Alert
} from "@mui/material";
import Image from "next/image";
import { logError } from "@/utils/logger";
import { supabase } from "@/lib/supabaseClient";

export default function SendEmail() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [subjectMessage, setSubjectMessage] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/the-turn/sign-in");
    } else if (session.user.role !== "admin") {
      router.push("/the-turn/unauthorized");
    }
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return setError("Please select an image.");

    setLoading(true);
    setError("");
    setFeedback("");

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from("uploads")
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: url } = await supabase.storage
      .from("uploads")
      .getPublicUrl(data.path);

    try {
      const res = await fetch("/api/admin/send-newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          subjectMessage,
          caption,
          imageUrl: url.publicUrl
        })
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to send newsletter.");
        return;
      }
      setFeedback(data.message || "Newsletter sent successfully!");
    } catch (err) {
      logError("Failed to send newsletter:", err);
      setError("Failed to send newsletter.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h6">Send Newsletter Email</Typography>

        <TextField
          fullWidth
          label="Subject Message"
          value={subjectMessage}
          onChange={(e) => setSubjectMessage(e.target.value)}
          margin="normal"
        />
        <TextField
          multiline
          fullWidth
          rows={3}
          label="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          margin="normal"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ margin: "1rem 0" }}
        />

        {preview && (
          <Box mb={2}>
            <Typography variant="subtitle1">Preview:</Typography>
            <Image
              src={preview}
              alt="Preview"
              width={300}
              height={200}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Send Newsletter"}
        </Button>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        {feedback && (
          <Typography color="secondary" mt={2}>
            {feedback}
          </Typography>
        )}
      </Box>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/the-turn/sign-in",
        permanent: false
      }
    };
  }

  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/the-turn/unauthorized",
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}
