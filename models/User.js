const { Schema, model } = require("mongoose");

const opt = {
  toJSON: {
    virtuals: true,
    getters: true,
    id: false,
  },
};

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email address is required"],
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, opt );

const User = model("User", UserSchema);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

module.exports = User;