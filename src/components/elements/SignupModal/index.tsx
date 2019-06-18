import * as React from 'react';
import Modal from '../Modal';
import styled from '../../../themes/styled';
import { clearFix } from 'polished';
import H5 from '../../typography/H5/H5';
import Text from '../../inputs/Text/Text';
import Button from '../Button/Button';
import { compose } from 'react-apollo';
import { withFormik, FormikProps, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alert from '../../elements/Alert';
import { graphql, OperationOption, ApolloConsumer } from 'react-apollo';
const { createUserMutation } = require('../../../graphql/createUser.graphql');
import { Trans } from '@lingui/macro';
import { i18nMark } from '@lingui/react';
const checkUsername = require('../../../graphql/checkUsername.graphql');

let tt = {
  login: i18nMark('Sign in'),
  placeholders: {
    email: i18nMark('eg. mary@moodlers.org'),
    name: i18nMark('eg. Moodler Mary'),
    password: i18nMark('Choose your password'),
    passwordConfirm: i18nMark('Confirm your password')
  }
};

interface Props {
  toggleModal?: any;
  modalIsOpen?: boolean;
  errors: any;
  touched: any;
  isSubmitting: boolean;
}

interface FormValues {
  name: string;
  email: string;
  password: string;
  username: string;
  passwordConfirm: string;
}

interface MyFormProps {
  createUser: any;
  toggleModal: any;
}

async function validateUsername(value, client) {
  let error;
  if (value.length < 3) {
    error = 'Choose a username longer than 3 characters';
    return error;
  } else {
    const { data } = await client.query({
      query: checkUsername,
      variables: { username: value }
    });
    if (!data.usernameAvailable) {
      error = 'that username has been taken!';
      return error;
    }
  }
}

const withCreateUser = graphql<{}>(createUserMutation, {
  name: 'createUser'
  // TODO enforce proper types for OperationOption
} as OperationOption<{}, {}>);

const CreateCommunityModal = (props: Props & FormikProps<FormValues>) => {
  const { toggleModal, modalIsOpen, errors, touched, isSubmitting } = props;
  return (
    <ApolloConsumer>
      {client => (
        <Modal isOpen={modalIsOpen} toggleModal={toggleModal}>
          <Container>
            <Header>
              <H5>
                <Trans>Create a new account</Trans>
              </H5>
            </Header>
            <Form>
              <Row>
                <label>
                  <Trans>Email</Trans>
                </label>
                <ContainerForm>
                  <Field
                    name="email"
                    render={({ field }) => (
                      <Text
                        placeholder={tt.placeholders.email}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.email &&
                    touched.email && <Alert>{errors.email}</Alert>}
                </ContainerForm>
              </Row>
              <Row>
                <label>
                  <Trans>Display Name</Trans>
                </label>
                <ContainerForm>
                  <Field
                    name="name"
                    render={({ field }) => (
                      <Text
                        placeholder={tt.placeholders.name}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </ContainerForm>
              </Row>
              <Row>
                <label>
                  <Trans>Preferred username</Trans>
                </label>
                <ContainerForm>
                  <Field
                    name="username"
                    validate={val => validateUsername(val, client)}
                    render={({ field }) => (
                      <>
                        <Text
                          // placeholder="The name of the community..."
                          name={field.name}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </>
                    )}
                  />
                  {/* {errors.username &&
            touched.username && <Alert>{errors.username}</Alert>} */}
                  {errors.username && <Alert>{errors.username}</Alert>}
                </ContainerForm>
              </Row>
              <Row>
                <label>
                  <Trans>Password</Trans>
                </label>
                <ContainerForm>
                  <Field
                    name="password"
                    render={({ field }) => (
                      <Text
                        placeholder={tt.placeholders.password}
                        type="password"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.password &&
                    touched.password && <Alert>{errors.password}</Alert>}
                </ContainerForm>
              </Row>
              <Row>
                <label>
                  <Trans>Confirm password</Trans>
                </label>
                <ContainerForm>
                  <Field
                    name="passwordConfirm"
                    render={({ field }) => (
                      <Text
                        placeholder={tt.placeholders.passwordConfirm}
                        type="password"
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {errors.passwordConfirm &&
                    touched.passwordConfirm && (
                      <Alert>{errors.passwordConfirm}</Alert>
                    )}
                </ContainerForm>
              </Row>
              <Actions>
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  style={{ marginLeft: '10px' }}
                >
                  <Trans>Sign Up</Trans>
                </Button>
                <Button onClick={toggleModal} secondary>
                  <Trans>Cancel</Trans>
                </Button>
              </Actions>
            </Form>
          </Container>
        </Modal>
      )}
    </ApolloConsumer>
  );
};

const ModalWithFormik = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: props => ({
    name: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: ''
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required('Password is required'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password confirm is required')
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    const variables = {
      user: {
        email: values.email,
        name: values.name,
        password: values.password,
        preferredUsername: values.username
      }
    };
    return props
      .createUser({
        variables: variables
      })
      .then(res => {
        process.env.REACT_APP_GRAPHQL_ENDPOINT ===
        'https://home.moodle.net/api/graphql'
          ? localStorage.setItem('user_access_token', res.data.createUser.token)
          : localStorage.setItem(
              'dev_user_access_token',
              res.data.createUser.token
            );
        setSubmitting(false);
        window.location.reload();
      })
      .catch(err => {
        setSubmitting(false);
        alert(err);
        console.log(err);
      });
  }
})(CreateCommunityModal);

export default compose(withCreateUser)(ModalWithFormik);

const Container = styled.div`
  font-family: ${props => props.theme.styles.fontFamily};
`;
const Actions = styled.div`
  ${clearFix()};
  height: 60px;
  padding-top: 10px;
  padding-right: 10px;
  & button {
    float: right;
  }
`;

const Row = styled.div<{ big?: boolean }>`
  ${clearFix()};
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
  height: ${props => (props.big ? '180px' : '100px')};
  display: flex;
  padding: 20px;
  & textarea {
    height: 120px;
  }
  & label {
    width: 200px;
    line-height: 40px;
  }
`;

const ContainerForm = styled.div`
  flex: 1;
  ${clearFix()};
`;

const Header = styled.div`
  height: 60px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.2);
  & h5 {
    text-align: center !important;
    line-height: 60px !important;
    margin: 0 !important;
  }
`;
