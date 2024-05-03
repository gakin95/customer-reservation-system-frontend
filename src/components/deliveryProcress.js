import React from "react";
import Text from "./Typography/Typography";
import check from "../assets/icons/check-good-yes.svg";

const DeliveryProcress = (props) => {
  return (
    <div className="flex bg-white w-full">
      <div className="p-3">
        <div className="py-3">
          <Text variant="h4" color="text-NEUTRAL-_900" weight="semibold">
            Delivery Process
          </Text>
        </div>
        <div className="flex-col flex-start">
          <div className="flex items-start gap-3">
            <div className="flex-col flex items-center justify-center">
              <div
                className="w-6 h-6 flex items-center justify-center"
                style={{
                  background: "#05944F",
                  border: "1px solid #fff",
                  borderRadius: "50%",
                }}
              >
                <img src={check} alt="check icon" />
              </div>
              <div
                className=""
                style={{
                  height: "60px",
                  width: 0,
                  border: "0.5px dashed #05944F",
                }}
              ></div>
            </div>
            <div>
              <Text variant="h4" color="text-NEUTRAL-_900">
                Order Placed
              </Text>
              <Text variant="sub" color="text-NEUTRAL-_900">
                31.09.2021, 3:52PM
              </Text>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-col flex items-center justify-center">
              <div
                className="w-6 h-6 flex items-center justify-center"
                style={
                  props.processing === "ship" || props.processing === "done"
                    ? {
                        background: "#05944F",
                        border: "1px solid #fff",
                        borderRadius: "50%",
                      }
                    : {
                        background: "#fff",
                        border: "5px solid #05944F",
                        borderRadius: "50%",
                      }
                }
              >
                <img src={check} alt="check icon" />
              </div>
              <div
                className=""
                style={
                  props.processing === "ship" || props.processing === "done"
                    ? {
                        height: "60px",
                        width: 0,
                        border: "0.5px dashed #05944F",
                      }
                    : {
                        height: "60px",
                        width: 0,
                        border: "0.5px dashed #5C6F7F",
                      }
                }
              ></div>
            </div>
            <div>
              <Text variant="h4" color="text-NEUTRAL-_900">
                Order is yet to be processed
              </Text>
              <Text variant="sub" color="text-NEUTRAL-_900">
                Not yet
              </Text>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-col flex items-center justify-center">
              <div
                className="w-6 h-6 flex items-center justify-center"
                style={
                  props.processing === "done"
                    ? {
                        background: "#05944F",
                        border: "1px solid #fff",
                        borderRadius: "50%",
                      }
                    : {
                        background: "#fff",
                        border: "5px solid #05944F",
                        borderRadius: "50%",
                      }
                }
              >
                <img src={check} alt="check icon" />
              </div>
              <div
                className=""
                style={
                  props.processing === "done"
                    ? {
                        height: "60px",
                        width: 0,
                        border: "0.5px dashed #05944F",
                      }
                    : {
                        height: "60px",
                        width: 0,
                        border: "0.5px dashed #5C6F7F",
                      }
                }
              ></div>
            </div>
            <div>
              <Text variant="h4" color="text-NEUTRAL-_900">
                Order is yet to be shipped
              </Text>
              <Text variant="sub" color="text-NEUTRAL-_900">
                Not yet
              </Text>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-col flex items-center justify-center">
              <div
                className="w-6 h-6 flex items-center justify-center"
                style={{
                  background: "#fff",
                  border: "5px solid #05944F",
                  borderRadius: "50%",
                }}
              >
                <img src={check} alt="check icon" />
              </div>
            </div>
            <div>
              <Text variant="h4" color="text-NEUTRAL-_900">
                Out for delivery
              </Text>
              <Text variant="sub" color="text-NEUTRAL-_900">
                Not yet
              </Text>
            </div>
          </div>
        </div>
        <div className="pt-64 px-3 text-center">
          <Text variant="body" color="text-NEUTRAL-_900">
            Having problem with our delivery partner?
            <span style={{ color: "orange" }}>Talk to us</span>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProcress;
