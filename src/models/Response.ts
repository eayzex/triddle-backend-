import mongoose, { type Document, Schema } from "mongoose"

export interface IResponse extends Document {
  formId: mongoose.Types.ObjectId
  data: Record<string, any>
  submittedAt: Date
}

const ResponseSchema = new Schema<IResponse>({
  formId: {
    type: Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<IResponse>("Response", ResponseSchema)
