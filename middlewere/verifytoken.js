const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token
function verifyToken(req, res, next) {
  // Get the token from the request header, query parameter, or cookie
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. Token is required." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // If verification is successful, attach the decoded payload to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    // If token verification fails, return an error response
    return res.status(403).json({ message: "Invalid token." });
  }
}

module.exports = verifyToken;
