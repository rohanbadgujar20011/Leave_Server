const Leave = require("../Model/Leave");
const { otpGen } = require("otp-gen-agent");
const nodemailer = require("nodemailer");
async function idCreater() {
  const ID = await otpGen(4);
  const LeaveId = "LE" + ID;
  return LeaveId;
}
// Controller function to create a leave request
// Controller function to create a leave request
exports.createLeave = async (req, res) => {
  try {
    // Generate a unique leaveID using otp-generator
    let leaveID;
    let isUnique = false;

    // Loop until a unique leaveID is generated
    while (!isUnique) {
      leaveID = await idCreater();

      // Check if a leave request with the same leaveID exists
      const existingLeave = await Leave.findOne({ leaveID });
      if (!existingLeave) {
        isUnique = true;
      }
    }

    // Extract data from the request body
    const { name, email, fromDate, toDate, reason, assignedTeacher,assignedRector } = req.body;

    // Create a new leave instance
    const newLeave = new Leave({
      leaveID,
      name,
      email,
      from: fromDate,
      to: toDate,
      reason,
      assignedTeacher,
      assignedRector
    });

    // Save the leave instance to the database
    await newLeave.save();

    // Send an email to the user
    // Create Nodemailer transporter
    // let transporter = nodemailer.createTransport({
    //   service: "Gmail",
    //   auth: {
    //     user: `${process.env.email}`, // Your Gmail address
    //     pass: `${process.env.password}`, // Your Gmail password
    //   },
    // });

    // // Define email options
    // let mailOptions = {
    //   from: `${process.env.email}`, // Sender address
    //   to: email, // List of recipients
    //   subject: "Leave Request", // Subject line
    //   text: `Hii ${name}, your leave request has been successfully created. Leave ID: ${leaveID}, We will notify you once your Request get approved by Teacher and Hostel Rector `, // Plain text body
    // };

    // // Send email with defined transport object
    // await transporter.sendMail(mailOptions);

    // Send JSON response
    res
      .status(201)
      .json({ message: "Leave request created successfully", leave: newLeave });
  } catch (error) {
    console.error("Error creating leave request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getleavesbyemail = async (req, res) => {
  try {
    const email = req.params.id;

    const leaves = await Leave.find({ email });

    res.status(200).json({ leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
