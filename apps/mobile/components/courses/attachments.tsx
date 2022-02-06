import { Linking } from 'react-native'
import { Box, FlatList, HStack, Image, Pressable, View, VStack } from 'native-base'
import { StaticAttachment } from '@rianarai/classroom'
import Text from '../Text'

function AttachmentThumbnail({ attachment }: { attachment: StaticAttachment }) {
  return (
    <Image
      roundedLeft={'md'}
      height={'16'}
      width={'16'}
      alt={'Thumbnail'}
      source={
        attachment.thumbnailUrl
          ? {
              uri: attachment.thumbnailUrl,
            }
          : undefined
      }
      // @ts-expect-error May be a type error?
      fallbackElement={() => (
        <Box
          bgColor={'gray.300'}
          _dark={{
            bgColor: 'gray.600',
          }}
        />
      )}
      _dark={{
        borderColor: 'gray.600',
      }}
      bgColor="gray.100"
    />
  )
}

function AttachmentItem({ item }: { item: StaticAttachment }) {
  return (
    <Pressable
      borderWidth={1}
      onPress={() => item.url && Linking.openURL(item.url)}
      rounded="lg"
      borderColor={'gray.300'}
      _pressed={{
        bgColor: 'gray.100',
      }}
      _dark={{
        _pressed: {
          bgColor: 'gray.800',
        },
        bgColor: 'black',
        borderColor: 'gray.600',
      }}
    >
      <HStack>
        <AttachmentThumbnail attachment={item} />
        <VStack
          space={'0.5'}
          flexShrink={1}
          mr="4"
          borderLeftWidth={1}
          px="4"
          justifyContent={'center'}
          borderColor={'gray.300'}
        >
          <Text content bold isTruncated noOfLines={1}>
            {item.title}
          </Text>
          <Text content color="gray.600" fontSize="xs" _dark={{ color: 'gray.400' }}>
            {item.type}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  )
}

export default function Attachments({
  modal,
  attachments,
}: {
  modal?: boolean
  attachments: StaticAttachment[]
}) {
  return (
    <View>
      <FlatList
        scrollEnabled={!modal}
        data={attachments}
        renderItem={AttachmentItem}
        ItemSeparatorComponent={() => <Box py="2" />}
        keyExtractor={(item, i) => (item.title as string) + i}
      />
    </View>
  )
}
