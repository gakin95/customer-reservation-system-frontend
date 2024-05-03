// import { NavLink } from "react-router-dom";
// import InappLayout from "./inappLayout";
// import Text from "../../components/Typography/Typography";
// import BackButton from "../../components/BackButton/BackButton";
// import printerImg from "../../assets/icons/printer.svg";
// import DeliveryProcress from "../../components/deliveryProcress";
// import infoImg from "../../assets/icons/info.svg";

// const NavItems = [
//   {
//     name: "Details",
//     link: "/fulfilment/deliveries/details",
//   },
//   {
//     name: "Invoices",
//     link: "/fulfilment/deliveries/invoices",
//   },
// ];

// const SingleDeliveryLayout = ({ children }) => {
//   const isActive = {
//     borderBottom: "3px solid #3C48FC",
//   };
//   return (
//     <div>
//       <InappLayout>
//         <div className="w-full h-full bg-BACKGROUND_LIGHT py-9 px-8">
//           <div>
//             <div className="flex items-center mb-6">
//               <span>
//                 <BackButton />
//               </span>

//               <Text variant="body" weight="bold" format="pl-6">
//                 Deliveries
//               </Text>
//             </div>

//             <span className="flex items-end">
//               <p className="font-semibold mr-3 leading-none text-3xl">
//                 #S7565882367-ID
//               </p>
//               <p className="text-NEUTRAL-_500 text-base">
//                 September 23, 2017 at 3:23pm
//               </p>
//             </span>

//             <span className="flex mt-5 cursor-pointer">
//               <img src={printerImg} alt="printerImg" />

//               <Text variant="body" color="text-NEUTRAL-_500" format="ml-2">
//                 Print Delivery Information
//               </Text>
//             </span>
//           </div>
//           <div className="flex justify-between items-start gap-5">
//             <div className="w-9/12">
//               <div>
//                 <div className="flex border-b my-6">
//                   {NavItems.map((item, index) => {
//                     return (
//                       <NavLink
//                         className="mr-4"
//                         to={item.link}
//                         activeStyle={isActive}
//                         key={index}
//                       >
//                         <Text variant="h4" color="text-NEUTRAL-_500">
//                           {item.name}
//                         </Text>
//                       </NavLink>
//                     );
//                   })}
//                 </div>
//               </div>
//               {children}
//             </div>
//             <div className="w-4/12">
//               <DeliveryProcress />
//             </div>
//           </div>
//         </div>
//       </InappLayout>
//     </div>
//   );
// };

// export default SingleDeliveryLayout;
