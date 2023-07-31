import { Profile } from "../models/profile.js"
// Update import statements for the models
import { Schedule } from "../models/schedule.js";

async function create(req, res) {
  try {
    req.body.owner = req.user.profile;
    const schedule = await Schedule.create(req.body);
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { schedules: schedule } },
      { new: true }
    );
    schedule.owner = profile;
    res.status(201).json(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function index(req, res) {
  try {
  const schedules = await Schedule.find({})
  .populate('owner')
  .sort({ createdAt: 'desc' });
  res.status(200).json(schedules);
  } catch (error) {
  console.log(error);
  res.status(500).json(error);
  }
}

async function show(req, res) {
  try {
    const { scheduleId } = req.params;
    const schedule = await Schedule.findById(scheduleId)
    .populate('owner')
    res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

async function update(req, res) {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.scheduleId,
      req.body,
      { new: true }
    )
    .populate('owner');
    res.status(200).json(schedule);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.scheduleId);
    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    const profile = await Profile.findById(req.user.profile);

    // Remove the schedule from the profile's schedules array
    profile.schedules.remove(req.params.scheduleId);
    await profile.save();

    res.json(schedule);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

export {
  index,
  create,
  show,
  update,
  deleteSchedule as delete,
}