const themeOptions = [
  { name: 'classic' },
  { name: 'electricblue' },
  { name: 'steelgrey' },
  { name: 'pastelrainbow' },
  { name: 'jazzberryjam' },
  { name: 'bloodred' },
  { name: 'cyan' },
  { name: 'orange' },
  { name: 'royalblue' },
];

/**
 * SettingsPage component.
 *
 * @param {object} props - Component props.
 * @returns {HTMLElement}
 */
const SettingsPage = props => (
  <Page>
    <Section
      title="Cosmic Rays Settings">
      <Select
        label="Choose Theme"
        settingsKey="theme"
        options={themeOptions}
      />
    </Section>
  </Page>
);

registerSettingsPage(SettingsPage);
