export async function GET(req, res) {
  const nextAuthSession = req.cookies['next-auth.session-token'] || '';
  return res.status(200).json(nextAuthSession);
}