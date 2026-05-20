import { AppLogo } from '@/components/app-logo';
import { Board } from '@/components/board';
import { CurrentPlayerInfo } from '@/components/current-player-info';
import { GameOverModal } from '@/components/game-over-modal';
import { PointsChip } from '@/components/points-chip';
import { RestartButton } from '@/components/restart-button';
import { LinearGradient } from 'expo-linear-gradient';
import { Modal, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useHome } from './(home)/useHome';
import { useHomeStyles } from './(home)/useHomeStyles';

export default function Index() {
  const {
    points,
    boardKey,
    showModal,
    handlePlayerSelect,
    handleRestart,
    handleClose,
    boxes,
    winner,
    size,
    currentPlayer,
    isGameOver,
  } = useHome();
  const styles = useHomeStyles();

  return (
    <LinearGradient colors={['#DCFFBD', '#CC86D1']} style={{ flex: 1 }} start={[0, 0]} end={[1, 1]}>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.headerBrowWrapper}>
          <PointsChip points={points} />
        </View>
        <AppLogo />
        <View style={styles.boardWrapper}>
          <Board
            boxes={boxes}
            onPlayerSelect={handlePlayerSelect}
            size={size}
            highlightedCells={winner?.moves}
            key={boardKey}
          />
          <RestartButton onPress={handleRestart} />
        </View>
        {!isGameOver && <CurrentPlayerInfo currentPlayer={currentPlayer} />}
        <Modal animationType="slide" transparent={true} visible={showModal}>
          <GameOverModal winner={winner} onClose={handleClose} onRestart={handleRestart} />
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
