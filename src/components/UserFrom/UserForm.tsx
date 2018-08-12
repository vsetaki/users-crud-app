import * as React from 'react';
import { Form, Input, DatePicker, Row, Col, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { REQUIRED_RULE } from '../../constants';
import { update, create } from 'api';

const FormItem = Form.Item;

interface Props extends FormComponentProps {
  // data: Users;
  // isSaved?: boolean;
  onSubmit: () => void;
  editingUser?: number;
  // onCreate: (values: User) => void;
  // onUpdate: (values: User) => void;
}

class UserForm extends React.Component<Props, {}> {
  state = {
    isSaved: false,
  };

  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const { form, editingUser, onSubmit } = this.props;

    form.validateFields((err: string, values: User) => {
      if (!err) {
        if (editingUser) {
          update(editingUser, values).then(onSubmit);
        } else {
          create(values).then(onSubmit);
        }
      }
    });
  }

  render() {
    const { editingUser, form } = this.props;
    const { getFieldDecorator } = form;
    const buttonText = editingUser ? 'Сохранить' : 'Добавить пользователя';
    return (
      <Form>
        <Row>
          <Col span={12}>
            <FormItem label="ФИО">
              {getFieldDecorator('name', {
                rules: [
                  { ...REQUIRED_RULE },
                  { max: 100, message: 'ФИО не может быть больше 100 символов' },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <FormItem label="Дата рождения">
              {getFieldDecorator('birthdate')(
                <DatePicker format="DD.MM.YYYY" />
              )}
              {/* {getFieldDecorator('birthdate-date')(
              <Select />
            )}
            {getFieldDecorator('birthdate-month')(
              <Select />
            )}
            {getFieldDecorator('birthdate-year')(
              <Select />
            )} */}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="Город">
              {getFieldDecorator('city')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Адрес">
              {getFieldDecorator('address')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Телефон">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    pattern: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                    message: 'Неверный формат телефона'
                  },
                ],
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Button type="primary" onClick={this.handleSubmit}>{buttonText}</Button>
      </Form>
    );
  }
}

export default Form.create()(UserForm);
