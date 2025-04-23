import { WaitListForm } from "./components/feature/waitListForm/WaitListForm"
import { WaitListFormFieldsT } from "./components/feature/waitListForm/WaitListFormData"
import { TopMenu } from "./components/layout/TopMenu"



function App() {

  function handleFormSubmit(value: WaitListFormFieldsT) {
    console.log('(formSubmit) value:', value)
  }

  return (

    <div className="[--top-menu-h:3.5rem] flex flex-col w-full h-svh [--md-mx:1.5rem]">

      <TopMenu />

      <div className="flex flex-col items-center gap-4 px-6 py-8 size-full">
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <h3>
            Waiting list registration
          </h3>
          <WaitListForm handleFormSubmit={handleFormSubmit} />
        </div>
      </div>

    </div>

  )
}

export default App
