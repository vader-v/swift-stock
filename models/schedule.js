import mongoose from 'mongoose'

const Schema = mongoose.Schema

const orderReceiptSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
})

const scheduleSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    orderReceipts: [orderReceiptSchema],
  },
  {
    timestamps: true,
  }
)

const Schedule = mongoose.model('Schedule', scheduleSchema)

export { Schedule }
