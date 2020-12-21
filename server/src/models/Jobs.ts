import * as mongoose from 'mongoose';

const JobsSchema = new mongoose.Schema({ json: Object });
const Jobs = mongoose.model('jobs', JobsSchema);
export { Jobs };
