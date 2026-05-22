import express from "express"
import Razorpay from "razorpay"
import crypto from "crypto"

const router = express.Router()

// POST /api/razorpay/create-order
router.post("/create-order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const { amount = 1, projectName } = req.body

    const options = {
      amount: amount * 100, // ₹1 = 100 paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        project: projectName || "Portfolio Demo",
      },
    }

    const order = await razorpay.orders.create(options)
    res.json(order)
  } catch (error) {
    console.error("Razorpay order creation error:", error)
    res.status(500).json({ error: "Failed to create order" })
  }
})

// POST /api/razorpay/verify-payment
router.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex")

    const isValid = expectedSignature === razorpay_signature

    if (isValid) {
      res.json({ success: true, paymentId: razorpay_payment_id })
    } else {
      res.status(400).json({ success: false, error: "Invalid signature" })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    res.status(500).json({ success: false, error: "Verification failed" })
  }
})

export default router