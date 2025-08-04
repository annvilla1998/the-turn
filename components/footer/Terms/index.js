import React, { useState } from "react";
import { Modal, Typography, Box, useTheme } from "@mui/material";

export const Terms = ({ style }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Typography
        onClick={() => setOpen(true)}
        sx={{
          cursor: "pointer",
          color: "#fff",
          ":hover": {
            opacity: 0.8
          }
        }}
      >
        Terms and Conditions
      </Typography>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="Terms and Conditions"
        aria-describedby="Terms and Conditions for The Turn"
      >
        <Box
          sx={{
            ...style,
            backgroundColor: theme.palette.background.default,
            overflowY: "auto"
          }}
        >
          <Typography
            id="terms-and-conditions-title"
            variant="h6"
            component="h2"
          >
            Terms & Conditions
          </Typography>
          <br />
          <Typography id="terms-and-conditions" variant="body1" component="p">
            Welcome to The Turn By using this indoor golf simulator, you ("the
            User") agree to the following terms and conditions. Please read
            these terms carefully before using the Simulator:
            <br />
            <br />
            <ul>
              <li>
                1. Acceptance of Terms: By accessing and using the Simulator,
                you acknowledge that you have read, understood, and agreed to
                comply with these terms and conditions. If you do not agree with
                these terms, please refrain from using the Simulator.
              </li>
              <li>
                2. Use of the Simulator: The Simulator is intended for
                recreational purposes only. Users must follow all posted rules,
                guidelines, and instructions provided by The Turn . Failure to
                adhere to these rules may result in denied access to the
                Simulator.
              </li>
              <li>
                3. Safety and Responsibility: Users are responsible for their
                safety and the safety of others while using the Simulator. Users
                must operate the Simulator in a safe and responsible manner,
                keeping in mind their surroundings, fellow users, and Facility
                staff.
              </li>
              <li>
                4. Age and Supervision: Users must be of legal age to operate
                the Simulator independently. Minors must be accompanied and
                supervised by a responsible adult while using the Simulator.
              </li>
              <li>
                5. Health Considerations: Users should be in good health and
                physical condition to use the Simulator. If you have any
                pre-existing medical conditions, it is recommended to consult a
                medical professional before using the Simulator.
              </li>
              <li>
                6. Equipment Care: Users must treat the Simulator and its
                equipment with care and respect. Any intentional or negligent
                damage to the Simulator or its components may result in
                liability for repair or replacement costs.
              </li>
              <li>
                7. Intellectual Property: All intellectual property rights
                associated with the Simulator, including software, designs, and
                any related content, remain the property of The Turn or its
                licensors. Users may not copy, modify, distribute, or reverse
                engineer any part of the Simulator.
              </li>
              <li>
                8. Liability Waiver: Users acknowledge and understand that the
                use of the autonomous indoor golf simulator involves inherent
                risks, including the risk of injury, property damage, or other
                losses. Users agree to release and hold harmless The Turn, its
                owners, employees, agents, and representatives from any
                liability for any claims, demands, actions, or losses arising
                from the use of the Simulator.
              </li>
              <li>
                9. Data Collection and Privacy: The Simulator may collect usage
                data for the purpose of improving performance and user
                experience. By using the Simulator, you consent to the
                collection and use of such data by The Turn in accordance with
                its privacy policy.
              </li>
              <li>
                10. Reservation and Payment: Users must adhere to the Facility's
                reservation and payment policies for using the Simulator.
                Failure to follow these policies may result in denied access.
              </li>
              <li>
                11. Termination: The Turn reserves the right to terminate access
                to the Simulator at its discretion, without prior notice, if a
                User violates these terms and conditions or engages in unsafe or
                inappropriate behavior.
              </li>
              <li>
                12. Modifications: The Turn reserves the right to modify these
                terms and conditions at any time. Users are responsible for
                regularly reviewing these terms for any changes.
              </li>
              <br />
              By using the indoor golf simulator, you acknowledge that you have
              read and understood these terms and conditions and agree to abide
              by them. If you have any questions or concerns, please contact The
              Turn at theturnvv@gmail.com
            </ul>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
