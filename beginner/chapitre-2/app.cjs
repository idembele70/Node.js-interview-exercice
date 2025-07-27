async function waitAndLog() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log('Done waiting!');
}

waitAndLog()