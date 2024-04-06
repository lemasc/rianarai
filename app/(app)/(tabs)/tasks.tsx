import { FlashListWithHeaders } from "@codeherence/react-native-header";
import { FlashListProps } from "@shopify/flash-list";

import { ScrollableWithHeader } from "@/theme/scrollable";
import { Text } from "@/theme/ui";

const Header = () => (
  <>
    <Text style={{ color: "white" }} size="lg">
      สวัสดี <Text weight="bold">สานสา</Text>
    </Text>
    <Text style={{ color: "white" }} size="sm">
      ไหนเลื่อนใหม่ดิ๊
    </Text>
  </>
);

const LargeHeader = () => (
  <>
    <Text style={{ color: "white" }} size="4xl">
      สวัสดี <Text weight="bold">สานสา</Text>
    </Text>
    <Text style={{ color: "white" }} size="lg">
      แอนิเมชั่นลื่นมาก สุดยอด
    </Text>
  </>
);

export default function Tasks() {
  return (
    <ScrollableWithHeader<FlashListProps<object>>
      Component={FlashListWithHeaders}
      HeaderComponent={Header}
      LargeHeaderComponent={LargeHeader}
      data={new Array(100)}
      estimatedItemSize={49}
      contentContainerStyle={{ paddingTop: 0, backgroundColor: "white" }}
      renderItem={({ index }) => {
        if (index % 10 === 0) {
          return (
            <Text
              style={{
                paddingTop: 20,
                paddingBottom: 10,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: "#bfbfbf",
              }}
              weight="bold"
              size="2xl"
            >
              Header {index}
            </Text>
          );
        }
        return (
          <Text style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
            Index {index}
          </Text>
        );
      }}
    />
  );
}
