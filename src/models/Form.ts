import { timeStamp } from "console"
import mongoose, { type Document, Schema } from "mongoose"

interface IOption {
  id: string
  label: string
}

interface IQuestion {
  id: string
  type: string
  title: string
  placeholder?: string
  required?: boolean
  options?: IOption[]
}

export interface IForm extends Document {
  title: string
  description?: string
  userId: mongoose.Types.ObjectId
  questions: IQuestion[]
  createdAt: Date
}

const OptionSchema = new Schema<IOption>({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
})

const QuestionSchema = new Schema<IQuestion>({
 
  type: {
    type: String,
    required: true,
    enum: ["text", "email", "textarea", "radio", "checkbox", "date", "phone"],
  },
  title: {
    type: String,
    required: true,
  },
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
  options: [OptionSchema],
})

const FormSchema = new Schema<IForm>({
  title: {
    type: String,
    required: [true, "Please provide a form title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Description cannot be more than 500 characters"],
  },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  // },
  questions: {
    type: [QuestionSchema],
    required: false,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
},{timestamps: true})

export default mongoose.model<IForm>("Form", FormSchema)
