import * as React from 'react';
import { Form, Input, Row, Col, Button, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { REQUIRED_RULE, DATE_FORMAT_STORAGE } from '../../constants';
import { update, create } from 'api';
import { dissoc, range, omit } from 'ramda';
import { getMonthDays } from 'utils';
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;

interface Props extends FormComponentProps {
  onSubmit: () => void;
  editingUser?: User;
}

const monthArray = range(1, 13);
const yearArray = range(1900, new Date().getFullYear() + 1);

class UserForm extends React.Component<Props, {}> {
  /**
   * Готовит значения формы для хранилища
   */
  static transformValuesForStorage(values: UserFormData): User {
    const { birthdateDate, birthdateMonth, birthdateYear } = values;
    const birthdate = moment()
      .year(birthdateYear)
      .month(birthdateMonth - 1)
      .date(birthdateDate)
      .format(DATE_FORMAT_STORAGE);

    return {
      ...omit(['birthdateDate', 'birthdateMonth', 'birthdateYear'], values),
      birthdate,
    };
  }

  /**
   * Готовит значения хранилища для формы
   */
  static transformValuesForForm(values: User): UserFormData {
    const { birthdate } = values;

    if (!birthdate) {
      throw new Error('Дата является обязательным параметром');
    }

    const birthdateDate = moment(birthdate, DATE_FORMAT_STORAGE).date();
    const birthdateMonth = moment(birthdate, DATE_FORMAT_STORAGE).month() + 1;
    const birthdateYear = moment(birthdate, DATE_FORMAT_STORAGE).year();

    return {
      ...omit(['birthdate'], values),
      birthdateDate,
      birthdateMonth,
      birthdateYear,
    };
  }

  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidUpdate(prevProps: Props) {
    const { editingUser, form } = this.props;
    if (prevProps.editingUser !== editingUser) {
      form.resetFields();

      if (editingUser) {
        form.setFieldsValue(dissoc('id', UserForm.transformValuesForForm(editingUser)));
      }
    }
  }

  handleSubmit() {
    const { form, editingUser, onSubmit } = this.props;

    form.validateFields((err: string, values: UserFormData) => {
      if (!err) {
        if (editingUser) {
          update(editingUser.id, UserForm.transformValuesForStorage(values)).then(onSubmit);
        } else {
          create(UserForm.transformValuesForStorage(values)).then(onSubmit);
        }
        form.resetFields();
      }
    });
  }

  handleClear() {
    this.props.onSubmit();
  }

  renderDaysOptions() {
    const values = this.props.form.getFieldsValue() as UserFormData;
    return getMonthDays(values.birthdateMonth, values.birthdateYear).map((item) => (
      <Option value={item} key={item}>{item}</Option>
    ));
  }

  renderMonthOptions() {
    return monthArray.map((item) => (
      <Option value={item} key={item}>{item}</Option> // TODO: месяцы сделать словами
    ));
  }

  renderYearOptions() {
    return yearArray.map((item) => (
      <Option value={item} key={item}>{item}</Option>
    ));
  }

  render() {
    const { editingUser, form } = this.props;
    const { getFieldDecorator } = form;
    const buttonText = editingUser ? 'Сохранить' : 'Добавить пользователя';
    return (
      <Form className="user-edit-form">
        <Row gutter={16}>
          <Col span={12}>
            <FormItem label="ФИО">
              {getFieldDecorator('name', {
                rules: [
                  { ...REQUIRED_RULE },
                  { max: 100, message: 'ФИО не может быть больше 100 символов' },
                ],
                initialValue: '',
              })(
                <Input />
              )}
            </FormItem>
          </Col>

          <Col span={12}>
            <Row gutter={16}>
              <Col span={8}>
                <FormItem label="День">
                  {getFieldDecorator('birthdateDate', {
                    rules: [
                      { ...REQUIRED_RULE },
                    ]
                  })(
                    <Select>
                      {this.renderDaysOptions()}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Месяц">
                  {getFieldDecorator('birthdateMonth', {
                    rules: [
                      { ...REQUIRED_RULE },
                    ]
                  })(
                    <Select>
                      {this.renderMonthOptions()}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Год">
                  {getFieldDecorator('birthdateYear', {
                    rules: [
                      { ...REQUIRED_RULE },
                    ]
                  })(
                    <Select>
                      {this.renderYearOptions()}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <FormItem label="Город">
              {getFieldDecorator('city', {
                initialValue: '',
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Адрес">
              {getFieldDecorator('address', {
                initialValue: '',
              })(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="Телефон">
              {getFieldDecorator('phone', {
                rules: [
                  {
                    pattern: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Формат телефона должен быть +7 (XXX) XXX-XX-XX'
                  },
                ],
                initialValue: '',
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Button type="primary" onClick={this.handleSubmit} className="user-edit-form-submit">{buttonText}</Button>
        {editingUser && <Button type="ghost" onClick={this.handleClear}>Очистить</Button>}
      </Form>
    );
  }
}

export default Form.create()(UserForm);