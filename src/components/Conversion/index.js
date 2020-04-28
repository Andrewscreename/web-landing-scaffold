import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';
import DangerousHTMLContent from 'dangerously-set-html-content';
import isEmpty from 'lodash.isempty';

import { trackEvent } from 'common/lib/analytics';
import withReleaseInfo from 'common/lib/withReleaseInfo';

import styles from './styles.module.scss';

const FormField = ({ name, label, onChange, ...attrs }) => {
  const id = `field[${name}]`;
  return (
    <label className={styles.Label} htmlFor={id}>
      <input
        className={styles.Input}
        id={id}
        name={name}
        onChange={onChange}
        {...attrs}
      />
      {label && <div className={styles.LabelText}>{label}</div>}
    </label>
  );
};

FormField.propTypes = {
  name: PropTypes.string.isRequired,
};

const Conversion = ({ release }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(frontmatter: { name: { eq: "Conversion" } }) {
        ...ConversionContent
      }
    }
  `);

  const { html, frontmatter } = data.markdownRemark;
  const { hide, labels, heading } = frontmatter;

  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [hasIntent, setHasIntent] = React.useState();

  React.useEffect(() => {
    if (hasIntent === true) {
      trackEvent(trackEvent.EVENT__CONVERSION__INTENT, { release });
    }
  }, [hasIntent, release]);

  if (hide) {
    return null;
  }

  return (
    (frontmatter.useCustom && (
      <div id="get-started" className={cx('form', styles.CustomForm, {})}>
        <div className={cx(styles.Content)}>
          <DangerousHTMLContent html={html} />
        </div>
      </div>
    )) ||
    (!frontmatter.useCustom && (
      <div className={cx('form', styles.Form)}>
        <div className={cx(styles.Content)}>
          {!isEmpty(heading) && (
            <h3 className={cx('conversion-heading', styles.ConversionHeading)}>
              {heading}
            </h3>
          )}
          <form
            method="POST"
            name="mc-embedded-subscribe-form"
            action={frontmatter.action}
          >
            <input type="hidden" name="u" value={frontmatter.u} />
            <input type="hidden" name="id" value={frontmatter.id} />
            <input
              type="hidden"
              name={frontmatter.honeypot}
              tabIndex="-1"
              style={{ position: 'absolute', left: '-200vw' }}
              aria-hidden="true"
            />

            <FormField
              label={labels.first || 'Enter your first name'}
              onChange={(e) => {
                setHasIntent(true);
                setFirst(e.target.value);
              }}
              type="text"
              name="MERGE1"
              value={first}
              id="get-started"
              required
            />
            <FormField
              label={labels.last || 'Enter your last name'}
              onChange={(e) => {
                setHasIntent(true);
                setLast(e.target.value);
              }}
              type="text"
              name="MERGE2"
              value={last}
              required
            />
            <FormField
              label={labels.email || 'Enter your email'}
              onChange={(e) => {
                setHasIntent(true);
                setEmail(e.target.value);
              }}
              type="email"
              name="MERGE0"
              value={email}
              required
            />
            <button className={styles.Submit} type="submit">
              {frontmatter.submitLabel}
            </button>
          </form>
        </div>
      </div>
    ))
  );
};

export default withReleaseInfo(Conversion);
