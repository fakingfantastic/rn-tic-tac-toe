import { AppLogo } from '@/components/app-logo';
import { Board } from '@/components/board';
import { Button } from '@/components/button';
import { CurrentPlayerInfo } from '@/components/current-player-info';
import { PointsChip } from '@/components/points-chip';
import { RestartButton } from '@/components/restart-button';
import { useOpponent } from '@/hooks/use-opponent';
import { usePoints } from '@/hooks/use-points';
import { useTheme } from '@/hooks/use-theme';
import { useTicTacToe } from '@/hooks/use-tic-tac-toe';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const OPPONENT_ID = 2;

export default function Index() {
  const { points, addPoints } = usePoints();
  const theme = useTheme();
  const [boardKey, setBoardKey] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { moves, handlePlayerSelect, boxes, winner, size, currentPlayer, restart, isGameOver } =
    useTicTacToe({
      size: 3,
      players: [1, 2],
    });

  const { makeMove } = useOpponent({
    opponentId: OPPONENT_ID,
    size,
  });

  useEffect(() => {
    if (moves.length && moves.at(-1)?.player !== OPPONENT_ID && !isGameOver) {
      setTimeout(() => handlePlayerSelect(makeMove(moves)), Math.floor(Math.random() * 2000));
    }
  }, [moves, makeMove, handlePlayerSelect, isGameOver]);

  useEffect(() => {
    if (isGameOver) {
      setShowModal(true);
    }
    if (winner?.player === 1) {
      console.log(isGameOver, winner, addPoints);
      addPoints(50);
    }
  }, [isGameOver, winner, addPoints]);

  const handleClose = useCallback(() => {
    setShowModal(false);
  }, []);

  /* TODO: Handle this inside the Board component */
  const handleRestart = useCallback(() => {
    setBoardKey(Math.random() * 1000);
    setShowModal(false);
    restart();
  }, [restart]);

  return (
    <LinearGradient colors={['#DCFFBD', '#CC86D1']} style={{ flex: 1 }} start={[0, 0]} end={[1, 1]}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
          gap: 16,
        }}
      >
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
          {/* TODO: Award Points for Games Won */}
          <PointsChip points={points} />
        </View>
        <AppLogo />
        <View style={{ flex: 1, justifyContent: 'center', gap: 16 }}>
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
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: 'rgba(255,255,255,.95)',
                borderRadius: 20,
                borderWidth: 3,
                borderColor: 'white',
                padding: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Pressable
                onPress={handleClose}
                style={{ position: 'absolute', top: 16, right: 16, opacity: 0.5 }}
              >
                <Svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                  <Path
                    fill="#1c274c"
                    d="M10.03 8.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.97 1.97a.75.75 0 1 0 1.06 1.06L12 13.06l1.97 1.97a.75.75 0 0 0 1.06-1.06L13.06 12l1.97-1.97a.75.75 0 1 0-1.06-1.06L12 10.94z"
                  />
                  <Path
                    fill="#1c274c"
                    fill-rule="evenodd"
                    d="M12 1.25C6.063 1.25 1.25 6.063 1.25 12S6.063 22.75 12 22.75 22.75 17.937 22.75 12 17.937 1.25 12 1.25M2.75 12a9.25 9.25 0 1 1 18.5 0 9.25 9.25 0 0 1-18.5 0"
                    clip-rule="evenodd"
                  />
                </Svg>
              </Pressable>
              <View>
                {winner?.player === 1 && (
                  <View style={{ gap: 16, alignItems: 'center' }}>
                    <Svg width="64" height="64" fill="none" viewBox="0 -2.5 160 160">
                      <Path
                        fill={theme.colors.fuchsia600}
                        d="M78.634 112.149c-10.169.051-18.59-1.712-25.67-7.374-2.386-1.907-4.222-4.596-5.983-7.153-1.012-1.47-.871-3.421.948-4.417 1.544-.845 3.108-.368 4.186 1.087 6.462 8.723 15.797 10.642 25.78 10.573 3.785-.025 7.59-.893 11.338-1.62 6.598-1.279 11.9-4.577 15.499-10.418a21 21 0 0 1 2.987-3.653c1.43-1.454 3.153-2.387 5.103-.98 1.733 1.248 1.699 2.987.981 4.854a25.64 25.64 0 0 1-11.095 13.18c-7.806 4.639-16.49 5.688-24.074 5.921M58.658 46.923l-4.363-.968c-9.78-2.167-18.255-.244-24.94 7.726-.695.829-2.2.98-3.329 1.444-.327-1.286-1.332-2.974-.854-3.791 1.449-2.465 3.103-5.08 5.337-6.765 9.23-6.957 19.477-7.326 30.097-3.725 1.702.578 3.043 1.766 2.577 3.79-.457 1.997-2.065 2.493-4.525 2.288M51.875 56.865c5.494.115 10.04 2.53 13.733 6.668a4.43 4.43 0 0 1 1.228 2.332c.085 1.155.064 2.74-.624 3.402-.565.542-2.302.316-3.28-.114-1.52-.669-2.833-1.804-4.239-2.735-7.624-5.05-14.435-3.344-18.973 4.563-.598 1.041-2.211 2.254-3.22 2.145-1.936-.208-1.956-2.167-1.774-3.777.696-6.186 6.915-11.534 14.294-12.324.895-.097 1.8-.105 2.855-.16M112.27 35.891c4.66-.162 9.021 1.22 13.141 3.464a15.3 15.3 0 0 1 2.776 1.896c1.351 1.185 2.273 2.688 1.26 4.469-1.103 1.937-2.979 1.786-4.778 1.186a12.7 12.7 0 0 1-2.687-1.4c-7.366-4.648-14.656-4.37-21.907.265a25.3 25.3 0 0 1-3.772 2.222c-.714.297-2.085.316-2.438-.12a3.5 3.5 0 0 1-.491-2.748 5.7 5.7 0 0 1 1.746-2.406c4.796-4.474 10.314-7.197 17.15-6.828M113.689 54.113c3.819-.131 7.712 1.427 10.998 4.444a15.1 15.1 0 0 1 2.776 3.366c1.41 2.387 1.137 5.026-.42 6.177-1.631 1.207-3.585.53-5.735-1.99-5.848-6.85-12.276-7.271-19.128-1.25-.254.224-.491.466-.745.69-1.196 1.07-2.534 2.396-4.095 1.017-1.693-1.497-.868-3.259.227-4.828 3.254-4.658 9.456-7.727 16.122-7.626"
                      />
                      <Path
                        fill={theme.colors.fuchsia600}
                        d="M3.803 55.975c-7.01 27.55-.871 51.856 18.257 72.248a77 77 0 0 0 1.514 1.562c10.275 10.275 23.073 16.619 33.215 21.034 4.352 1.9 26.686 4.209 32.729 3.309 35.911-5.363 59.543-25.617 67.774-59.503a86.6 86.6 0 0 0 2.332-20.259c.038-16.069-6.727-34.75-20.68-48.74a279 279 0 0 1-4.252-3.611c-3.002-2.581-6.105-5.253-9.351-7.532C100.543-2.97 74.778-3.067 48.764 6.188 25.21 14.562 10.084 31.316 3.803 55.975m45.061-41.538C71.69 4.952 94.592 3.28 116.928 17.484c4.084 2.6 14.972 11.4 16.687 12.723l.109.08.092.102c8.714 9.24 18.689 26.138 18.472 43.507a88.7 88.7 0 0 1-2.992 21.992c-5.674 20.623-19.239 35.653-41.47 45.933-22.6 10.821-55.011-.119-63.635-5.811a100.7 100.7 0 0 1-24.655-23.967c-10.64-15.063-13.027-36.715-7.31-56.51a64.18 64.18 0 0 1 36.638-41.096"
                      />
                    </Svg>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 32,
                          fontFamily: 'Fredoka-Bold',
                          color: theme.colors.fuchsia400,
                        }}
                      >
                        You Won!
                      </Text>
                      <Text style={{ fontSize: 16, color: theme.light.text.primary }}>
                        You have earned <Text style={{ fontWeight: 'bold' }}>50</Text> tokens
                      </Text>
                    </View>
                    <Button onPress={handleRestart}>
                      <Text style={{ fontWeight: 'bold', color: theme.colors.white }}>
                        Play Again
                      </Text>
                    </Button>
                  </View>
                )}
                {winner?.player === 2 && (
                  <View style={{ gap: 16, alignItems: 'center' }}>
                    <Svg width="64" height="64" fill="none" viewBox="0 -2.5 160 160">
                      <Path
                        fill={theme.colors.rose600}
                        d="M87.538 92.183c10.405-.019 18.981 2.04 27.051 6.09a13.2 13.2 0 0 1 4.549 3.359c.795 1.032 1.231 3.271.632 4.206-.709 1.106-2.727 1.945-4.131 1.886-1.679-.068-3.421-1.03-4.947-1.925-11.85-6.953-24.461-7.754-37.534-4.716-6.962 1.617-12.427 5.639-16.93 11.07-.502.606-.947 1.262-1.448 1.868-1.05 1.265-2.066 3.273-4.002 1.954-1.896-1.29-1.425-3.424-.37-5.146 4.43-7.246 10.517-12.528 18.591-15.414a61 61 0 0 1 18.539-3.232M54.08 78.053c-4.57-.211-8.688-1.73-11.81-5.414-1.318-1.557-2.358-3.438-.593-5.086 1.715-1.601 3.227-.265 4.605 1.11 5.747 5.736 13.172 3.955 15.892-3.763.374-1.062.721-2.135 1.15-3.173.678-1.633 1.994-2.848 3.65-2.094a4.61 4.61 0 0 1 2.276 3.227 12.89 12.89 0 0 1-4.77 11.376c-2.962 2.497-6.45 3.592-10.4 3.817M105.686 73.275a16.58 16.58 0 0 1-12.877-8.302 9.56 9.56 0 0 1-1.151-5.146c.048-1.002 1.324-2.573 2.241-2.723.858-.144 2.506 1.042 2.868 1.998.956 2.526 2.2 4.631 4.567 6.04 4.155 2.475 6.835 1.761 9.038-2.505 1.777-3.44 3.496-4.595 5.481-3.683 1.856.852 2.296 3.276 1.211 6.678-1.516 4.763-5.383 7.607-11.378 7.642M41.274 52.063a55 55 0 0 1-5.877-3.354c-.51-.37-.495-1.907-.207-2.73.135-.379 1.625-.666 2.287-.418 6.593 2.477 11.467-.773 16.058-4.776 1.336-1.166 2.268-2.788 3.44-4.153 1.15-1.34 2.538-2.574 4.333-1.355 1.758 1.195 1.24 3.037.454 4.564-3.178 6.175-8.676 9.217-15.13 10.842-1.63.41-3.319.574-4.983.852zM111.841 48.08c-5.977-.42-10.875-2.377-14.626-6.707a7.6 7.6 0 0 1-1.838-3.154c-.184-.902.217-2.427.885-2.858s2.465-.212 2.938.381c3.927 4.929 9.166 6.135 15.083 5.892 1.746-.072 3.56.441 3.68 2.63.111 2.018-1.347 2.98-3.139 3.379-1.091.243-2.215.33-2.983.438"
                      />
                      <Path
                        fill={theme.colors.rose600}
                        d="M3.294 55.975c-7.01 27.55-.871 51.856 18.258 72.248a78 78 0 0 0 1.513 1.562c10.275 10.275 23.074 16.619 33.215 21.034 4.352 1.9 26.687 4.209 32.729 3.309 35.911-5.363 59.544-25.617 67.774-59.503a86.6 86.6 0 0 0 2.332-20.259c.039-16.069-6.727-34.75-20.68-48.74a284 284 0 0 1-4.252-3.611c-3.002-2.581-6.105-5.253-9.351-7.532C100.034-2.97 74.27-3.067 48.255 6.188 24.7 14.562 9.575 31.316 3.295 55.975m45.062-41.538C71.18 4.952 94.083 3.28 116.419 17.484c4.085 2.6 14.973 11.4 16.687 12.723l.11.08.091.102c8.714 9.24 18.693 26.138 18.473 43.507a88.7 88.7 0 0 1-2.993 21.992c-5.674 20.623-19.239 35.653-41.47 45.933-22.6 10.821-55.01-.119-63.634-5.811a100.7 100.7 0 0 1-24.656-23.967C8.387 96.98 6 75.328 11.714 55.533a64.18 64.18 0 0 1 36.64-41.096z"
                      />
                    </Svg>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 32,
                          fontFamily: 'Fredoka-Bold',
                          color: theme.colors.fuchsia400,
                        }}
                      >
                        Bummer, you lost!
                      </Text>
                      <Text style={{ fontSize: 16, color: theme.light.text.primary }}>
                        It happens to the best of us
                      </Text>
                    </View>
                    <Button onPress={handleRestart}>
                      <Text style={{ fontWeight: 'bold', color: theme.colors.white }}>
                        Try Again
                      </Text>
                    </Button>
                  </View>
                )}
                {winner === null && (
                  <View style={{ gap: 16, alignItems: 'center' }}>
                    <View style={{ alignItems: 'center' }}>
                      <Text
                        style={{
                          fontSize: 32,
                          fontFamily: 'Fredoka-Bold',
                          color: theme.colors.fuchsia400,
                        }}
                      >
                        It&apos;s a Draw!
                      </Text>
                      <Text style={{ fontSize: 16, color: theme.light.text.primary }}>
                        You were so close... so were they!
                      </Text>
                    </View>
                    <Button onPress={handleRestart}>
                      <Text style={{ fontWeight: 'bold', color: theme.colors.white }}>
                        Try Again
                      </Text>
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}
