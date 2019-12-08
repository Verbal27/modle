import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Modal from '.';
import { themeDeco } from '../../styleguide/storiesThemeDecorator';

const asyncAction = (ms: number, actname: string) => (...args) => (
  action(actname)(...args), new Promise(resolve => setTimeout(resolve, ms))
);
storiesOf('Modules/CreateCommunity', module)
  .addDecorator(themeDeco())
  .add('Standard with init vals', () => (
    <Modal
      closeModal={action('close modal')}
      onSubmit={asyncAction(2000, 'send stuff')}
      initialValues={{
        image: 'http://test.com/img.jpg',
        name: 'my-name',
        summary: 'the summary'
      }}
    />
  ))
  .add('Standard', () => (
    <Modal
      closeModal={action('close modal')}
      onSubmit={asyncAction(2000, 'send stuff')}
    />
  ));
