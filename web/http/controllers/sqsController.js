export const processSqsMessage = async (req, res) => {
  console.log("*".repeat(100));
  console.log(req.body);
  return res
  .status(200)
  .json({ body : req.body});;
};