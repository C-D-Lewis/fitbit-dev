const categories = [
  { name: 'Headlines', value: 'headlines' },
  { name: 'World', value: 'world' },
  { name: 'UK', value: 'uk' },
  { name: 'Politics', value: 'politics' },
  { name: 'Health', value: 'health' },
  { name: 'Education', value: 'education' },
  { name: 'Science and Environment', value: 'science_and_environment' },
  { name: 'Technology', value: 'technology' },
  { name: 'Entertainment and Arts', value: 'entertainment_and_arts' },
];

const SettingsPage = () => (
  <Page>
    <Section
      title="News Headlines Settings">
      <Select
        label="Choose news category"
        settingsKey="category"
        options={categories}
      />
    </Section>
  </Page>
);

registerSettingsPage(SettingsPage);
