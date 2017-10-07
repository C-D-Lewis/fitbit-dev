function SettingsPage(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Isotime Settings</Text>}>
        <Select
          label={`Color set`}
          settingsKey="color"
          options={[
            {name: "red" },
            {name: "blue" },
            {name: "green" },
            {name: "yellow" },
            {name: "pink" },
            {name: "jazzberryjam" },
            {name: "bloodred" },
            {name: "cyan" },
            {name: "orange" },
            {name: "royalblue" }
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);
