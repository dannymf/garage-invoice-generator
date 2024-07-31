import React, { Fragment } from "react";
import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import GarageLogo from "./garageLogo";
import { createTw } from "react-pdf-tailwind";

type TruckObj = {
  id: string;
  sellingPrice: number;
  itemBrand: string;
  itemAge: number;
  listingDescription: string;
  listingTitle: string;
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      colors: {
        custom: "#bada55",
      },
    },
  },
});

const styles = StyleSheet.create({
  titleContainer: {
    paddingTop: "10px",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  pageStyle: {
    lineHeight: 1.5,
    fontSize: 12,
    display: "flex",
    fontWeight: "bold",
    flexDirection: "column",
  },
  addressTitle: {},
  titleStyle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginRight: 20,
    color: "#0007d6",
  },
  gridStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  invoiceNumber: {},
  spaceBetween: {},
  invoice: {},
  address: {},
  theader: {
    marginTop: 20,
    fontSize: 10,
    fontStyle: "bold",
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    height: 20,
    backgroundColor: "#DEDEDE",
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },
  tbody: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1,
    borderColor: "whitesmoke",
    borderRightWidth: 1,
    borderBottomWidth: 1,
  },
  tbody2: { flex: 2, borderRightWidth: 1 },
  total: {
    fontSize: 9,
    paddingTop: 4,
    paddingLeft: 7,
    flex: 1.5,
    borderColor: "whitesmoke",
    borderBottomWidth: 1,
  },
});

const Title = () => (
  <View style={styles.titleContainer}>
    <View style={styles.gridStyle}>
      <View style={tw("p-5")}>
        <GarageLogo />
      </View>
      <View
        style={{
          backgroundColor: "#f5a889",
          borderRadius: "30%",
          padding: 10,
          marginRight: 10,
          alignItems: "center",
        }}
      >
        <Text style={styles.titleStyle}>Garage</Text>
        <Text style={styles.addressTitle}>support@withgarage.com</Text>
        <Text style={styles.addressTitle}>(201) 293-7164</Text>
      </View>
    </View>
  </View>
);

const TableHeader = () => (
  <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
    <View style={[styles.theader, styles.theader2]}>
      <Text>Item</Text>
    </View>
    <View style={styles.theader}>
      <Text>Make</Text>
    </View>
    <View style={styles.theader}>
      <Text>Price</Text>
    </View>
  </View>
);

const TableBody = ({ item }: { item: TruckObj }) => (
  <Fragment key={item.id}>
    <View style={{ width: "100%", flexDirection: "row" }}>
      <View style={[styles.tbody, styles.tbody2]}>
        <Text>{item.listingTitle}</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{item.itemBrand}</Text>
      </View>
      <View style={styles.tbody}>
        <Text>{formatter.format(item.sellingPrice)}</Text>
      </View>
    </View>
    <View style={[styles.tbody, styles.tbody2, tw("my-5")]}>
      <Text style={{ fontWeight: "bold", backgroundColor: "#d1c1bc" }}>
        Item Description:
      </Text>
      <Text>{item.listingDescription.replaceAll("\n", " | ")}</Text>
      <View style={[styles.tbody2, tw("my-5")]}>
        <Text style={{ fontWeight: "bold", backgroundColor: "#d1c1bc" }}>
          Transaction ID:
        </Text>
        <Text>{item.id}</Text>
      </View>
      <View style={[styles.tbody2, tw("my-5"), { display: "flex" }]}>
        <Text
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            border: "2px solid orangered",
            borderRadius: "30%",
            padding: 5,
            margin: 5,
          }}
        >
          {
            "Your transaction has been approved! Thank you for shopping with us. Please don't hesitate to reach out with questions."
          }
        </Text>
      </View>
    </View>
  </Fragment>
);

export default function Invoice({ item }: { item: TruckObj }): JSX.Element {
  return (
    <Document>
      <Page size="LETTER" style={styles.pageStyle}>
        <Title />
        <TableHeader />
        <TableBody item={item} />
      </Page>
    </Document>
  );
}
