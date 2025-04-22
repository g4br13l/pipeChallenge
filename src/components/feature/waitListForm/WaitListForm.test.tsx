import { render, screen } from "@testing-library/react"
import { WaitListForm } from "./WaitListForm"
import userEvent from "@testing-library/user-event"



describe('WaitListForm component tests', () => {

  const validData = {
    name: 'Gabriel',
    email: 'gabriel@email.com',
    phone: '21988887777',
    maskedPhone: '(21) 98888-7777'
  }
  const invalidData = {
    nameTooShort: 'Ga',
    nameTooLong: 'G'.repeat(31),
    email: 'gab@com',
    phoneTooShort: '219888877',
    phoneTooLong: '219888877776'

  }

  beforeEach(() => {
    render(<WaitListForm />)
  })

  it('should render the WaitListForm component', () => {
    // arrange
    //screen.debug()
    // act
    const inputName = screen.getByRole('textbox', { name: /name/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    const inputPhone = screen.getByRole('textbox', { name: /phone/i })
    const button = screen.getByRole('button')
    // assert
    expect(inputName).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(inputPhone).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(/save/i)
  })

  describe('Success submission tests', () => {

    it('should fullfil all inputs with valid data', async () => {
      // arrange
      // act
      const user = userEvent.setup()
      const inputName = screen.getByRole('textbox', { name: /name/i })
      await user.type(inputName, validData.name)
      const inputEmail = screen.getByRole('textbox', { name: /email/i })
      await user.type(inputEmail, validData.email)
      const inputPhone = screen.getByRole('textbox', { name: /phone/i })
      await user.type(inputPhone, validData.phone)
      // assert
      expect(inputName).toHaveValue(validData.name)
      expect(inputEmail).toHaveValue(validData.email)
      expect(inputPhone).toHaveValue(validData.maskedPhone)
    })

    it('should submit the form with valid values filled', async () => {
      // arrange
      // act - form fields
      const user = userEvent.setup()
      const inputName = screen.getByRole('textbox', { name: /name/i })
      await user.type(inputName, validData.name)
      const inputEmail = screen.getByRole('textbox', { name: /email/i })
      await user.type(inputEmail, validData.email)
      const inputPhone = screen.getByRole('textbox', { name: /phone/i })
      await user.type(inputPhone, invalidData.phoneTooLong)
      // act - form submission
      const submitButton = screen.getByRole('button', { name: /Save/i })
      await user.click(submitButton)
      const successMessage = screen.getByRole('strong')
      // assert
      expect(successMessage).toBeInTheDocument()
    })

  })

  describe('Fail submitting invalid values', () => {

    it('should show an error when submit a name with less than 3 characters', async () => {
      // arrange
      // act
      const user = userEvent.setup()
      const inputName = screen.getByRole('textbox', { name: /name/i })
      await user.type(inputName, invalidData.nameTooShort)
      const submitButton = screen.getByRole('button', { name: /Save/i })
      await user.click(submitButton)
      screen.debug()
      const errorText = screen.getByText(/at least 3 character/i)
      // assert
      expect(errorText).toBeInTheDocument()
    })

    it('should show an error when submit a name with more than 30 characters', async () => {
      // arrange
      // act
      const user = userEvent.setup()
      const inputName = screen.getByRole('textbox', { name: /name/i })
      await user.type(inputName, invalidData.nameTooLong)
      const submitButton = screen.getByRole('button', { name: /Save/i })
      await user.click(submitButton)
      const errorText = screen.getByText(/at most 30 character/i)
      // assert
      expect(errorText).toBeInTheDocument()
    })

    it('should show an error when submit a invalid email', async () => {
      // arrange
      // act
      const user = userEvent.setup()
      const inputEmail = screen.getByRole('textbox', { name: /email/i })
      await user.type(inputEmail, invalidData.email)
      const submitButton = screen.getByRole('button', { name: /Save/i })
      await user.click(submitButton)
      const errorText = screen.getByText(/invalid email/i)
      // assert
      expect(errorText).toBeInTheDocument()
    })

    it('should show an error when submit a phone number too short', async () => {
      // arrange
      // act
      const user = userEvent.setup()
      const inputPhone = screen.getByRole('textbox', { name: /phone/i })
      await user.type(inputPhone, invalidData.phoneTooShort)
      const submitButton = screen.getByRole('button', { name: /Save/i })
      await user.click(submitButton)
      const errorText = screen.getByText(/Invalid phone/i)
      // assert
      expect(errorText).toBeInTheDocument()
    })

  })

})

