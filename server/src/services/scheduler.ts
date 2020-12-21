import schedule from 'node-schedule';

const runSchedule = (job: CallableFunction) => {
  //run job every 30 min
  console.log('run schedule');
  const j = schedule.scheduleJob('*/30 * * * *', () => {
    console.log('execute job');
    job();
  });
  j.invoke();
  return j;
};

export { runSchedule };
