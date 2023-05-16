import 'semantic-ui-css/semantic.min.css'

const Spinner = () => {
  return (
    <div className='flex justify-center'>
      <div className='h-16 w-16 animate-spin rounded-full border-4 border-teal-400 border-t-transparent' />
    </div>

    // <div className="ui active dimmer">
    //   <div className="ui loader"></div>
    // </div>
  )
}

export default Spinner
