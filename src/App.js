import React, { useState } from "react";
import "./styles.css";
import {
  Text,
  Container,
  Arrange,
  Select,
  Spacer,
  Tabs,
  Tab,
  Split,
  SplitSection
} from "@loomhq/lens";
import { dates, getDateName } from "./data/dates";
import { Lego } from "./lego";
import { filterValues, getFilterCondition } from "./filter";

const omittedProps = ["key", "id"];

export default function App() {
  const dateKeys = Object.keys(dates);
  const defaultDate = dateKeys[0];
  const getJson = (date) => dates[date].json;

  const defaultJson = getJson(defaultDate);
  const [selectedJson, setSelectedJson] = useState(defaultJson);
  const [selectValue, setSelectValue] = useState(defaultDate);

  const handleDateSelect = (option) => {
    setSelectValue(option.value);
    setSelectedJson(getJson(option.value));
  };

  const [filterValue, setFilterValue] = useState(filterValues[1]);

  const getTotalUsage = () => {
    let total = 0;
    Object.values(selectedJson).map((item) => (total += item.instances));

    return total;
  };

  return (
    <div>
      <Container
        padding="var(--pagePadding)"
        backgroundColor="background"
        contentColor="body"
      >
        <Lego />
        <Text size="large" fontWeight="bold">
          Lens usage in Loom webapp
        </Text>
        <Spacer y="large">
          <Split gap="large" width="calc(100vw - var(--pagePadding))">
            <SplitSection basis={20}>
              <Select
                selectedOptionValue={selectValue}
                onChange={(option) => {
                  handleDateSelect(option);
                }}
                options={dateKeys.map((dateKey) => {
                  return { value: dateKey, title: getDateName(dateKey) };
                })}
              />
            </SplitSection>
            <SplitSection>
              <Container
                overflow="auto"
                width="calc(100vw - var(--pagePadding))"
                paddingRight={2}
              >
                <Tabs>
                  {filterValues.map((filterItem, index) => (
                    <Tab
                      isActive={filterItem === filterValue}
                      onClick={() => setFilterValue(filterItem)}
                      key={index}
                    >
                      {filterItem}
                      <span style={{ fontWeight: 400 }}>
                        &nbsp;(
                        {
                          Object.entries(selectedJson).filter(([key]) =>
                            getFilterCondition(filterItem, key)
                          ).length
                        }
                        )
                      </span>
                    </Tab>
                  ))}
                </Tabs>
              </Container>
            </SplitSection>
          </Split>
        </Spacer>
        <Spacer bottom="medium">
          <Text isInline fontWeight="bold">
            {getTotalUsage()}
          </Text>{" "}
          elements used in total
        </Spacer>
        {Object.entries(selectedJson)
          .filter(([key]) => getFilterCondition(filterValue, key))
          .map(([key, value], index) => {
            const dynamicTextSize = `calc(12px + ${
              value.instances / 20
            }px + 0.5vw)`;

            return (
              <div key={index} className="rowWrapper">
                <Arrange
                  columns={{
                    default: ["1fr"],
                    small: ["1fr", "1fr", "1fr"]
                  }}
                >
                  <div style={{ fontSize: dynamicTextSize }}>
                    <Text color="inherit" size="inherit" fontWeight="bold">
                      {key}
                    </Text>
                  </div>
                  <div style={{ fontSize: dynamicTextSize }}>
                    <Text size="inherit" color="bodyDimmed" fontWeight="bold">
                      {value.instances}
                    </Text>
                  </div>
                  <div style={{ fontFeatureSettings: "tnum" }}>
                    {Object.entries(value.props).map(([key, value], index) => {
                      if (omittedProps.includes(key)) {
                        return null;
                      } else {
                        return (
                          <div
                            style={{ fontFamily: "Roboto Mono" }}
                            key={index}
                          >
                            <Text color="bodyDimmed">
                              {key}: {value}
                            </Text>
                          </div>
                        );
                      }
                    })}
                  </div>
                </Arrange>
              </div>
            );
          })}
      </Container>
    </div>
  );
}
