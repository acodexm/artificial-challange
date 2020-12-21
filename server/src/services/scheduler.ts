import schedule from 'node-schedule';

const runSchedule = (job: CallableFunction) => {
  //run job every 5 min
  console.log('run schedule')
  const j=schedule.scheduleJob('*/5 * * * *', () => {
    console.log('execute job')
    job();
  }).invoke();

};

export { runSchedule };
