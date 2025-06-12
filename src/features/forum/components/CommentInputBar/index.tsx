import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {Icon} from '@rneui/themed';
import {EdgeInsets} from 'react-native-safe-area-context';

type CommentInputBarProps = {
  safeAreaInsets: EdgeInsets;
  commentText: string;
  setCommentText: (text: string) => void;
  keyboardVisible: boolean;
  onSubmit: () => void;
};

const CommentInputBar: React.FC<CommentInputBarProps> = ({
  safeAreaInsets,
  commentText,
  setCommentText,
  keyboardVisible,
  onSubmit,
}) => {
  return (
    <View
      style={{
        paddingBottom: safeAreaInsets.bottom + 16,
        paddingHorizontal: 16,
        paddingTop: 16,
        elevation: 2,
        zIndex: 1000,
        gap: 8,
        borderTopColor: '#5f5f5f',
      }}>
      <BottomSheetTextInput
        value={commentText}
        onChangeText={setCommentText}
        multiline
        placeholder="Comment..."
        style={{
          backgroundColor: '#efefef',
          paddingLeft: 12,
          borderRadius: 8,
        }}
      />
      {(keyboardVisible || commentText.trim().length > 0) && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', gap: 8}}>
            <TouchableOpacity style={{alignSelf: 'center'}}>
              <Icon
                color={'#5f5f5f'}
                type="feather"
                name="camera"
                iconStyle={{fontSize: 20}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}}>
              <Icon
                color={'#5f5f5f'}
                type="feather"
                name="smile"
                iconStyle={{fontSize: 20}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={onSubmit}>
            <Icon
              color={'#5f5f5f'}
              type="feather"
              name="send"
              iconStyle={{fontSize: 20}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CommentInputBar;
