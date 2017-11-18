function SettingsPage(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Isotime Settings</Text>}>
        <Select
          label={`Choose Color`}
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
            {name: "royalblue" },
            {name: "white" }
          ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);
