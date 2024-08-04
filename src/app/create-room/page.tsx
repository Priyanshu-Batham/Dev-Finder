import { CreateRoomForm } from './create-room-form'

const page = () => {
  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      {/* <h1 className="sm:hidden text-red-500">Please use a Pc or Laptop to Create Rooms</h1> */}
      <h1 className='text-4xl font-bold'>Create Room</h1>
      <CreateRoomForm />
    </div>
  )
}

export default page
