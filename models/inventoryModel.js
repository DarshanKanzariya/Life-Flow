const mongoose = require("mongoose");
const inventorySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "Inventory Type is required"],
      enum: ["in", "out"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood Group is required"],
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    hospitalName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hospitalName",
      required: [true, "Hospital Name is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: function () {
        return this.inventoryType === "out";
    },
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: function () {
        if (this.inventoryType === null) {
          throw new Error("Inventory Type cannot be null");
        }
        return this.inventoryType === "in";
      },
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Inventory", inventorySchema);
