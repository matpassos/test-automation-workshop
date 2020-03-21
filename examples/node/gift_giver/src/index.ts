import createApp from 'app'

const app = createApp()

app.listen(app.get('port'), () => {
  // tslint:disable-next-line: no-console
  console.log(`    >>>> App is running on port ${app.get('port')}`)
})
