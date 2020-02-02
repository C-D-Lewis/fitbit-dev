const NOT_FOUND_OPTIONS = [{ name: 'No items found', value: 'none_found' }];

let sourceSelection;

const SettingsPage = ({ settings, settingsStorage }) => {
  const sources = JSON.parse(settings.sources || '[]');
  const calendars = JSON.parse(settings.calendars || '[]');
  if (!sources) {
    return <Text>No calendar sources identified.</Text>;
  }

  sourceSelection = settings.sourceSelection || null;
  const sourceOptions = sources.map(item => ({ name: item.title, value: item.id }));
  const calendarOptions = calendars.map(item => ({ name: item.title, value: item.id }));

  return (
    <Page>
      <Text>Select a calendar source and calendar to start seeing events on your watch.</Text>
      <Section title="Source Selection">
        <Select
          label={`Source`}
          value={sourceSelection}
          settingsKey="sourceSelection"
          options={sourceOptions.length > 0 ? sourceOptions : NOT_FOUND_OPTIONS}
          onChange={value => settingsStorage.setItem('sourceSelection', value)}
          onSelection={(selected, values) => {
            sourceSelection = selected;
          }}
        />
      </Section>
      {sourceSelection && (
        <Section title="Calendar Selection">
          <Text>Note: Calendars you do not own may not return any events.</Text>
          <Select
            label={`Calendar`}
            settingsKey="calendarSelection"
            options={calendarOptions.length > 0 ? calendarOptions : NOT_FOUND_OPTIONS}
            onChange={value => settingsStorage.setItem('calendarSelection', value)}
          />
        </Section>
      )}
    </Page>
  );
};

registerSettingsPage(SettingsPage);
