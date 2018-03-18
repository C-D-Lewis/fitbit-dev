function SettingsPage(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Beam Up Settings</Text>}>
        <Select
          label={`Choose Background Color`}
          settingsKey="color"
          options={[
            {name: "black" },
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