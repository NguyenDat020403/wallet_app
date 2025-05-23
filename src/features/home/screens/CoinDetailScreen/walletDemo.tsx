import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {ethers, Wallet} from 'ethers';

const INFURA_PROJECT_ID = '44b62ee0153941579e73f1d784472ad1'; // Thay bằng API Key của bạn

const WalletScreen: React.FC = () => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<string>('Loading...');

  // Tạo ví mới
  const createWallet = async () => {
    const newWallet = ethers.Wallet.createRandom(); // Tạo ví Ethereum mới
    // setWallet(newWallet);
    // fetchBalance(newWallet.address);
  };

  //   // Kiểm tra số dư ETH
  //   const fetchBalance = async (address: string) => {
  //     const provider = new ethers.providers.JsonRpcProvider(
  //       `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
  //     );
  //     const balanceWei = await provider.getBalance(address);
  //     setBalance(ethers.utils.formatEther(balanceWei)); // Chuyển từ Wei sang ETH
  //   };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ví Ethereum (TypeScript)</Text>

      <Button title="Tạo Ví Ethereum" onPress={createWallet} />

      {/* {wallet && (
        <View style={styles.walletInfo}>
          <Text>
            📌 <Text style={styles.label}>Địa chỉ ví:</Text> {wallet.address}
          </Text>
          <Text>
            🔑 <Text style={styles.label}>Khóa cá nhân:</Text>{' '}
            {wallet.privateKey}
          </Text>
          <Text>
            {/* 💰 <Text style={styles.label}>Số dư ETH:</Text> {balance} */}
      {/* </Text>
        </View>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  title: {fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#FFFFFF'},
  walletInfo: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
  },
  label: {fontWeight: 'bold', color: '#FFFFFF'},
});

export default WalletScreen;
