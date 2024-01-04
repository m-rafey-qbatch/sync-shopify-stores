import {
  Page,
  Text,
  AlphaCard,
  HorizontalStack
} from "@shopify/polaris";

export default function HomePage() {
  return (
    <Page narrowWidth>
      <AlphaCard>
        <HorizontalStack align="center">
          <Text>App running</Text>
        </HorizontalStack>
      </AlphaCard>
    </Page>
  );
}
