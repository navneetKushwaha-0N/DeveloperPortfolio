import mongoose from "mongoose"

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: [
      {
        type: String,
        required: true,
      },
    ],
    githubLink: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("NavneetPortfolioDatabase", projectSchema)
