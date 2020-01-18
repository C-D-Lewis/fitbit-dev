const colorOptions = [
  { name: "red" },
  { name: "blue" },
  { name: "green" },
  { name: "yellow" },
  { name: "pink" },
  { name: "jazzberryjam" },
  { name: "bloodred" },
  { name: "cyan" },
  { name: "orange" },
  { name: "royalblue" },
  { name: "white" },
];

const SettingsPage = props => (
  <Page>
    <Section
      title="Isotime Settings">
      <Select
        label="Choose Color"
        settingsKey="color"
        options={colorOptions}
      />
    </Section>
  </Page>
);

registerSettingsPage(SettingsPage);
