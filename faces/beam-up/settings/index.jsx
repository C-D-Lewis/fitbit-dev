const colorOptions = [
  { name: 'black' },
  { name: 'red' },
  { name: 'blue' },
  { name: 'green' },
  { name: 'yellow' },
  { name: 'pink' },
  { name: 'jazzberryjam' },
  { name: 'bloodred' },
  { name: 'cyan' },
  { name: 'orange' },
  { name: 'royalblue' }
];

const SettingsPage = props => (
  <Page>
    <Section
      title="Beam Up Settings">
      <Select
        label="Choose Background Color"
        settingsKey="color"
        options={colorOptions}
      />
    </Section>
  </Page>
);

registerSettingsPage(SettingsPage);
