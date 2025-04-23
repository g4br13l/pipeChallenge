import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { log } from "console"
import { WaitListForm } from "./WaitListForm"
import { WaitListFormFieldsT } from "./WaitListFormData"



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
  const formSubmissionValidData = {
    name: 'Gabriel',
    email: 'gabriel@email.com',
    phone: '(21) 98888-7777',
    allNotifications: true,
    allowPhoneCall: true,
    emailNotifications: true,
    smsNotifications: true,
  }

  const formProps = {
    handleSubmitMockFn: (value: WaitListFormFieldsT) => {
      log('(handleSubmitMockFn) value:', value)
    }
  }
  const handleOnSubmitFormSpy = vi.spyOn(formProps, 'handleSubmitMockFn')

  type ElementsT = {
    inputName: HTMLElement
    inputEmail: HTMLElement
    inputPhone: HTMLElement
    submitButton: HTMLElement
    allNotiCheckbox: HTMLElement
    emailNotiCheckbox: HTMLElement
    smsNotiCheckbox: HTMLElement
    allowPhoneCall: HTMLElement
  }

  const getElements = (): ElementsT => ({
    inputName: screen.getByRole('textbox', { name: /name/i }),
    inputEmail: screen.getByRole('textbox', { name: /email/i }),
    inputPhone: screen.getByRole('textbox', { name: /phone/i }),
    submitButton: screen.getByRole('button'),
    allNotiCheckbox: screen.getByRole('checkbox', { name: /All notifications/i, checked: true }),
    emailNotiCheckbox:
      screen.getByRole('checkbox', { name: /email notifications/i, checked: true }),
    smsNotiCheckbox: screen.getByRole('checkbox', { name: /sms notifications/i, checked: true }),
    allowPhoneCall: screen.getByRole('checkbox', { name: /allow phone call/i, checked: true }),
  })

  beforeEach(() => {
    render(<WaitListForm handleFormSubmit={formProps.handleSubmitMockFn} />)
  })

  it('should render the WaitListForm component', () => {
    // arrange // act
    const { inputName, inputEmail, inputPhone, submitButton } = getElements()
    // assert
    expect(inputName).toBeVisible()
    expect(inputEmail).toBeVisible()
    expect(inputPhone).toBeVisible()
    expect(submitButton).toBeVisible()
    expect(submitButton).toHaveTextContent(/save/i)
  })

  describe('Success submission tests', () => {

    it('should fill all inputs with valid data', async () => {
      // arrange // act
      const { inputName, inputEmail, inputPhone } = getElements()
      const user = userEvent.setup()
      await user.type(inputName, validData.name)
      await user.type(inputEmail, validData.email)
      await user.type(inputPhone, validData.phone)
      // assert
      expect(inputName).toHaveValue(validData.name)
      expect(inputEmail).toHaveValue(validData.email)
      expect(inputPhone).toHaveValue(validData.maskedPhone)
    })

    it('should submit the form successfully when filled with valid data', async () => {
      // arrange
      // act - form fields
      const { inputName, inputEmail, inputPhone, submitButton } = getElements()
      const user = userEvent.setup()
      await user.type(inputName, validData.name)
      await user.type(inputEmail, validData.email)
      await user.type(inputPhone, invalidData.phoneTooLong)
      // act - form submission
      await user.click(submitButton)
      const successMessage = screen.getByRole('strong')
      // assert
      expect(handleOnSubmitFormSpy).toHaveBeenCalledOnce()
      expect(handleOnSubmitFormSpy).toHaveBeenCalledWith(formSubmissionValidData)
      expect(successMessage).toBeVisible()
    })

  })

  describe('Fail submission tests', () => {

    it('should show an error when submit a name with less than 3 characters', async () => {
      // arrange // act
      const { inputName, submitButton } = getElements()
      const user = userEvent.setup()
      await user.type(inputName, invalidData.nameTooShort)
      await user.click(submitButton)
      const errorText = screen.getByText(/at least 3 character/i)
      // assert
      expect(handleOnSubmitFormSpy).not.toHaveBeenCalled()
      expect(errorText).toBeVisible()
    })

    it('should show an error when submit a name with more than 30 characters', async () => {
      // arrange // act
      const { inputName, submitButton } = getElements()
      const user = userEvent.setup()
      await user.type(inputName, invalidData.nameTooLong)
      await user.click(submitButton)
      const errorText = screen.getByText(/at most 30 character/i)
      // assert
      expect(handleOnSubmitFormSpy).not.toHaveBeenCalled()
      expect(errorText).toBeVisible()
    })

    it('should show an error when submit a invalid email', async () => {
      // arrange // act
      const { inputEmail, submitButton } = getElements()
      const user = userEvent.setup()
      await user.type(inputEmail, invalidData.email)
      await user.click(submitButton)
      const errorText = screen.getByText(/invalid email/i)
      // assert
      expect(handleOnSubmitFormSpy).not.toHaveBeenCalled()
      expect(errorText).toBeVisible()
    })

    it('should show an error when submit a phone number too short', async () => {
      // arrange // act
      const { inputPhone, submitButton } = getElements()
      const user = userEvent.setup()
      await user.type(inputPhone, invalidData.phoneTooShort)
      await user.click(submitButton)
      const errorText = screen.getByText(/Invalid phone/i)
      // assert
      expect(handleOnSubmitFormSpy).not.toHaveBeenCalled()
      expect(errorText).toBeVisible()
    })

  })

  describe('Permissions checkboxes tests', () => {

    it('should render all Permissions checkbox checked', () => {
      // arrange // act
      const { allNotiCheckbox, emailNotiCheckbox, smsNotiCheckbox, allowPhoneCall } = getElements()
      //assert
      expect(allNotiCheckbox).toBeVisible()
      expect(emailNotiCheckbox).toBeVisible()
      expect(smsNotiCheckbox).toBeVisible()
      expect(allowPhoneCall).toBeVisible()
    })

    it('should uncheck all notifications checkbox when parent is unchecked', async () => {
      // arrange // act
      const { allNotiCheckbox, emailNotiCheckbox, smsNotiCheckbox, allowPhoneCall } = getElements()
      const user = userEvent.setup()
      await user.click(allNotiCheckbox)
      //assert
      expect(allNotiCheckbox).not.toBeChecked()
      expect(emailNotiCheckbox).not.toBeChecked()
      expect(smsNotiCheckbox).not.toBeChecked()
      expect(allowPhoneCall).toBeChecked()
    })

    it('should check all notifications parent is checked', async () => {
      // arrange // act
      const { allNotiCheckbox, emailNotiCheckbox, smsNotiCheckbox, allowPhoneCall } = getElements()
      const user = userEvent.setup()
      await user.click(allNotiCheckbox)
      await user.click(allNotiCheckbox)
      //assert
      expect(allNotiCheckbox).toBeChecked()
      expect(emailNotiCheckbox).toBeChecked()
      expect(smsNotiCheckbox).toBeChecked()
      expect(allowPhoneCall).toBeChecked()
    })

    it('should uncheck parent checkbox when all children are unchecked', async () => {
      // arrange // act
      const { allNotiCheckbox, emailNotiCheckbox, smsNotiCheckbox, allowPhoneCall } = getElements()
      const user = userEvent.setup()
      await user.click(emailNotiCheckbox)
      await user.click(smsNotiCheckbox)
      //assert
      expect(allNotiCheckbox).not.toBeChecked()
      expect(emailNotiCheckbox).not.toBeChecked()
      expect(smsNotiCheckbox).not.toBeChecked()
      expect(allowPhoneCall).toBeChecked()
    })

    it('should check parent checkbox when all children are checked', async () => {
      // arrange // act
      const { allNotiCheckbox, emailNotiCheckbox, smsNotiCheckbox, allowPhoneCall } = getElements()
      const user = userEvent.setup()
      await user.click(allNotiCheckbox)
      await user.click(emailNotiCheckbox)
      await user.click(smsNotiCheckbox)
      //assert
      expect(allNotiCheckbox).toBeChecked()
      expect(emailNotiCheckbox).toBeChecked()
      expect(smsNotiCheckbox).toBeChecked()
      expect(allowPhoneCall).toBeChecked()
    })

    it('should uncheck "phone call" checkbox when clicked', async () => {
      // arrange // act
      const { allNotiCheckbox, emailNotiCheckbox, smsNotiCheckbox, allowPhoneCall } = getElements()
      const user = userEvent.setup()
      await user.click(allowPhoneCall)
      //assert
      expect(allNotiCheckbox).toBeChecked()
      expect(emailNotiCheckbox).toBeChecked()
      expect(smsNotiCheckbox).toBeChecked()
      expect(allowPhoneCall).not.toBeChecked()
    })

    it('should check "phone call" checkbox when clicked', async () => {
      // arrange // act
      const { allNotiCheckbox, emailNotiCheckbox, smsNotiCheckbox, allowPhoneCall } = getElements()
      const user = userEvent.setup()
      await user.click(allowPhoneCall)
      await user.click(allowPhoneCall)
      //assert
      expect(allNotiCheckbox).toBeChecked()
      expect(emailNotiCheckbox).toBeChecked()
      expect(smsNotiCheckbox).toBeChecked()
      expect(allowPhoneCall).toBeChecked()
    })

  })

})

