// sleep wait delay pause
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export { sleep }
