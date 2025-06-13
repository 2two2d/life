import { PlaygroundCanvas } from "@common/ui/components/draw-playground";

import { Button, Callout, Container, Flex, Select } from "@radix-ui/themes";

import { FIRST, ONE } from "@common/const";

import { Fragment, type ReactNode, useEffect } from "react";

import { useLifePlaygroundPresenter } from "../case";

import { GAME_RULES_IN_TEXT, GAME_SPEED_COEFFICIENTS } from "../const";

const LifePlayground = (): ReactNode => {
  const {
    map,
    handleClick,
    handleStartGame,
    handleStopGame,
    isInProcess,
    handleChangeSpeedCoefficient,
  } = useLifePlaygroundPresenter();

  useEffect(() => {
    handleChangeSpeedCoefficient(GAME_SPEED_COEFFICIENTS[FIRST]);
  }, []);

  return (
    <Container>
      <Flex
        mx="auto"
        mt="5"
        gap="5"
        direction="column"
        maxWidth="750px"
        align="center"
      >
        <Flex direction="column" gap="3">
          {GAME_RULES_IN_TEXT.map((rule, index) => {
            return (
              <Callout.Root key={index} color="grass" size="1">
                <Callout.Icon className="font-semibold">
                  {index + ONE}
                </Callout.Icon>
                <Callout.Text>{rule}</Callout.Text>
              </Callout.Root>
            );
          })}
        </Flex>

        <PlaygroundCanvas
          map={map}
          onClick={handleClick}
          cellIsPaintedKey="isAlive"
        />

        <Flex gap="5" width="400px">
          <Button
            onClick={isInProcess ? handleStopGame : handleStartGame}
            size="3"
            variant="outline"
            color={isInProcess ? "crimson" : "cyan"}
            className="!grow"
          >
            {isInProcess ? "STOP" : "START"}
          </Button>

          <Select.Root
            defaultValue={GAME_SPEED_COEFFICIENTS[FIRST].toString()}
            onValueChange={handleChangeSpeedCoefficient}
            size="3"
          >
            <Select.Trigger />
            <Select.Content>
              {GAME_SPEED_COEFFICIENTS.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <Select.Item value={item.toString()}>
                      x {ONE / item}
                    </Select.Item>
                    {index !== GAME_SPEED_COEFFICIENTS.length - 1 && (
                      <Select.Separator />
                    )}
                  </Fragment>
                );
              })}
            </Select.Content>
          </Select.Root>
        </Flex>
      </Flex>
    </Container>
  );
};

export { LifePlayground };
