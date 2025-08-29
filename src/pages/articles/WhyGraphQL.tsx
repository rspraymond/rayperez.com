import React from 'react'
import BlogPost from '../../components/BlogPost.tsx'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import LazySyntaxHighlighter from '../../components/LazySyntaxHighlighter'

const TakeawaysSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        Three Key Takeaways
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary='Flexibility and Adaptability'
            secondary="GraphQL's ability to allow clients to request exactly the data they need makes it highly adaptable to frequently changing requirements and diverse data needs. This flexibility reduces over-fetching and under-fetching, making it ideal for environments where requirements are dynamic and multiple services need access to a centralized database."
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Simplified API Structure and Client-Side Development'
            secondary='GraphQL uses a single endpoint for all queries, simplifying the API structure. It provides a unified schema for data presentation, which can be self-documenting and can generate TypeScript types/interfaces. This reduces the need for multiple REST endpoints and makes client-side development more streamlined and efficient.'
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary='Performance and Security Considerations'
            secondary='While GraphQL can reduce the number of requests and aggregate data from multiple sources, it introduces complexity in performance tuning and security implementation. Handling authorization and error responses can be more challenging compared to REST, requiring careful management of JSON parsing for access levels and dealing with status codes that may not reflect backend errors directly.'
          />
        </ListItem>
      </List>
    </React.Fragment>
  )
}

const IntroductionSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        I. Introduction
      </Typography>
      <Typography paragraph>
        In the world of API development, two major players have been vying for the top spot: GraphQL
        and REST. Both have their strengths and weaknesses, and the choice between the two often
        boils down to the specific needs of the project. In this post, I'll be sharing why, in my
        experience, I've found myself leaning more towards GraphQL.
      </Typography>
    </React.Fragment>
  )
}

const FlexibilitySection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        II. Flexibility and Adaptability
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. Handling frequently changing requirements
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Dynamic queries: With GraphQL, you can tailor your queries to your exact needs, fetching only the data you need. This is a stark contrast to REST, where you're often limited to predefined endpoints." />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    email
  }
}`}
      </LazySyntaxHighlighter>
      <List>
        <ListItem>
          <ListItemText primary='Single endpoint for multiple data needs: Unlike REST, where each resource has its own endpoint, GraphQL has a single endpoint that can handle multiple data needs. This makes it easier to adapt to changing requirements.' />
        </ListItem>
      </List>
      <Typography variant='h6' gutterBottom>
        B. Reducing over-fetching and under-fetching
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='Tailored data requests: GraphQL allows clients to specify exactly what data they need, reducing the risk of over-fetching or under-fetching. This can lead to more efficient data retrieval and better performance.' />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
  }
}`}
      </LazySyntaxHighlighter>
      <List>
        <ListItem>
          <ListItemText primary='Efficient data retrieval: With GraphQL, you can retrieve multiple resources in a single request, reducing the number of round trips to the server.' />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}`}
      </LazySyntaxHighlighter>
    </React.Fragment>
  )
}

const SimplifiedApiStructureSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        III. Simplified API Structure
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. Single endpoint for all queries
      </Typography>
      <LazySyntaxHighlighter language='graphql'>{`POST /graphql`}</LazySyntaxHighlighter>
      <Typography variant='h6' gutterBottom>
        B. Unified schema for data presentation
      </Typography>
      <LazySyntaxHighlighter language='graphql'>
        {`type User {
  id: ID!
  name: String!
  email: String!
}`}
      </LazySyntaxHighlighter>
      <Typography variant='h6' gutterBottom>
        C. Ease of integrating with multiple services
      </Typography>
      <Typography paragraph>
        With its single endpoint and unified schema, GraphQL can easily integrate with multiple
        services, providing a single point of access for all your data needs.
      </Typography>
    </React.Fragment>
  )
}

const PerformanceBenefitsSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        IV. Performance Benefits
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. Reducing the number of requests
      </Typography>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}`}
      </LazySyntaxHighlighter>
      <Typography variant='h6' gutterBottom>
        B. Aggregating data from multiple sources
      </Typography>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        text
      }
    }
  }
}`}
      </LazySyntaxHighlighter>
      <Typography variant='h6' gutterBottom>
        C. Optimizing data fetching strategies
      </Typography>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
  }
}`}
      </LazySyntaxHighlighter>
    </React.Fragment>
  )
}

const ClientSideAdvantagesSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        V. Client-Side Development Advantages
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. Self-documenting APIs
      </Typography>
      <LazySyntaxHighlighter language='graphql'>
        {`type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}`}
      </LazySyntaxHighlighter>
      <Typography variant='h6' gutterBottom>
        B. Generating TypeScript types/interfaces
      </Typography>
      <LazySyntaxHighlighter language='typescript'>
        {`interface User {
  id: string;
  name: string;
  email: string;
  posts: Post[];
}`}
      </LazySyntaxHighlighter>
      <Typography variant='h6' gutterBottom>
        C. Reducing the need for multiple REST endpoints
      </Typography>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}`}
      </LazySyntaxHighlighter>
    </React.Fragment>
  )
}

const SecurityAndErrorHandlingSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        VI. Security and Error Handling
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. Implementing complex authorization
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Parsing JSON for access levels: GraphQL allows you to parse JSON Web Tokens (JWTs) and implement complex authorization rules based on the user's access level." />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`const user = jwt.verify(token, SECRET);`}
      </LazySyntaxHighlighter>
      <List>
        <ListItem>
          <ListItemText primary='Handling security at the application layer: With GraphQL, you can handle security at the application layer, providing fine-grained control over who can access what data.' />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`const user = getUserFromContext(context);
if (!user.canSeePost(postId)) {
  throw new Error('Access denied');
}`}
      </LazySyntaxHighlighter>
      <Typography variant='h6' gutterBottom>
        B. Error handling in GraphQL
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='Status codes and response parsing: Unlike REST, which uses HTTP status codes to indicate errors, GraphQL always returns a 200 OK status code. Errors are included in the response body, making it easier to parse and handle errors.' />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='json'>
        {`{
  "errors": [
    {
      "message": "Access denied",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "post"
      ]
    }
  ],
  "data": {
    "post": null
  }
}`}
      </LazySyntaxHighlighter>
      <List>
        <ListItem>
          <ListItemText primary="Comparison with REST error handling: While REST's use of HTTP status codes for error handling can be simpler and more straightforward, GraphQL's approach provides more detailed and specific error information." />
        </ListItem>
      </List>
    </React.Fragment>
  )
}

const UseCasesSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        VII. Use Cases for GraphQL
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. Middle-layer services
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='Aggregating and transforming data: GraphQL can serve as a middle layer that aggregates and transforms data from multiple sources, making it easier for clients to consume.' />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        text
      }
    }
  }
}`}
      </LazySyntaxHighlighter>
      <List>
        <ListItem>
          <ListItemText primary='Providing a single source of truth: By aggregating data from multiple sources, GraphQL can provide a single source of truth, reducing the risk of data inconsistencies.' />
        </ListItem>
      </List>
      <Typography variant='h6' gutterBottom>
        B. Complex data requirements and multiple consumers
      </Typography>
      <Typography paragraph>
        GraphQL is ideal for scenarios where there are complex data requirements and multiple
        consumers of the data. With its flexible query language, GraphQL can cater to the specific
        data needs of each consumer.
      </Typography>
      <Typography variant='h6' gutterBottom>
        C. Scenarios with frequently changing requirements
      </Typography>
      <Typography paragraph>
        With its dynamic queries and single endpoint, GraphQL can easily adapt to changing
        requirements, making it a good choice for projects with frequently changing requirements.
      </Typography>
    </React.Fragment>
  )
}

const DrawbacksSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        VIII. Drawbacks and Considerations
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. Client-side complexity
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='Query management and documentation: Managing and documenting GraphQL queries can be more complex than with REST, especially for large projects with many queries.' />
        </ListItem>
        <ListItem>
          <ListItemText primary='Handling flexible responses: Because GraphQL allows clients to specify exactly what data they want, the shape of the response can vary greatly, which can add complexity on the client side.' />
        </ListItem>
      </List>
      <Typography variant='h6' gutterBottom>
        B. Performance tuning and optimization
      </Typography>
      <Typography paragraph>
        While GraphQL can improve performance by reducing over-fetching and under-fetching, it also
        requires careful tuning and optimization to ensure optimal performance.
      </Typography>
      <Typography variant='h6' gutterBottom>
        C. Versioning challenges
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='Field-by-field deprecation: Unlike REST, which can use versioned endpoints to manage changes, GraphQL handles changes on a field-by-field basis. This can make versioning more complex.' />
        </ListItem>
        <ListItem>
          <ListItemText primary='Managing evolving schemas: As your GraphQL schema evolves, managing changes and ensuring backward compatibility can be challenging.' />
        </ListItem>
      </List>
    </React.Fragment>
  )
}

const ComparingSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        IX. Comparing GraphQL and REST
      </Typography>
      <Typography variant='h6' gutterBottom>
        A. When to choose REST
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='Simpler, straightforward APIs: For simple APIs with straightforward data requirements, REST can be easier to use and understand.' />
        </ListItem>
        <ListItem>
          <ListItemText primary="Easier scalability and management: REST's stateless nature and use of HTTP status codes can make it easier to scale and manage." />
        </ListItem>
        <ListItem>
          <ListItemText primary="Clearer error handling with status codes: REST's use of HTTP status codes for error handling can be simpler and more straightforward than GraphQL's approach." />
        </ListItem>
      </List>
      <Typography variant='h6' gutterBottom>
        B. Integrating GraphQL with existing REST APIs
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary='Using GraphQL as a middle layer: You can use GraphQL as a middle layer to aggregate and transform data from existing REST APIs, providing a single point of access for clients.' />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    posts {
      title
    }
  }
}`}
      </LazySyntaxHighlighter>
      <List>
        <ListItem>
          <ListItemText primary='Aggregating and transforming REST data: With GraphQL, you can aggregate and transform data from multiple REST endpoints in a single query, simplifying the client-side code.' />
        </ListItem>
      </List>
      <LazySyntaxHighlighter language='graphql'>
        {`query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        text
      }
    }
  }
}`}
      </LazySyntaxHighlighter>
    </React.Fragment>
  )
}

const ConclusionSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        X. Conclusion
      </Typography>
      <Typography paragraph>
        In conclusion, while both GraphQL and REST have their strengths and weaknesses, I find
        myself leaning towards GraphQL for its flexibility, adaptability, and powerful features.
        However, the choice between GraphQL and REST ultimately depends on the specific needs of
        your project. I encourage you to evaluate both options based on your specific project needs
        and choose the one that best suits your requirements. Remember, the best tool is the one
        that helps you solve your problems in the most efficient way.
      </Typography>
    </React.Fragment>
  )
}

const FaqSection = (): React.ReactElement => {
  return (
    <React.Fragment>
      <Typography variant='h3' gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'>What is GraphQL?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            GraphQL is a query language for APIs and a runtime for executing those queries with your
            existing data. It provides an efficient and powerful alternative to REST.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'>Why should I use GraphQL over REST?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            GraphQL offers several advantages over REST, including flexibility in querying,
            efficiency in data retrieval, simplified API structure, and improved performance.
            However, the choice between GraphQL and REST depends on your specific project needs.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'>Is GraphQL faster than REST?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            GraphQL can be faster than REST as it allows clients to request exactly what they need,
            reducing the amount of data transferred over the network. However, the performance
            depends on how well the GraphQL server is implemented and optimized.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'>Is GraphQL secure?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, GraphQL can be secure. It provides robust options for implementing complex
            authorization rules and handling errors. However, like any technology, it needs to be
            used correctly to ensure security.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'>Can I use GraphQL with existing REST APIs?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Yes, you can use GraphQL as a middle layer to aggregate and transform data from existing
            REST APIs, providing a single point of access for clients.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'>What are the drawbacks of using GraphQL?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            While GraphQL offers many benefits, there are also some considerations to keep in mind,
            such as client-side complexity, the need for performance tuning and optimization, and
            challenges with versioning.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>
          <Typography variant='h6'>Does GraphQL replace REST?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Not necessarily. While GraphQL offers many benefits over REST, there are scenarios where
            REST might be a better choice. The choice between GraphQL and REST depends on your
            specific project needs.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </React.Fragment>
  )
}

const WhyGraphQL = (): React.ReactElement => {
  return (
    <BlogPost
      title='Why I Choose GraphQL'
      author='Raymond Perez'
      date='2024-07-04'
      children={
        <React.Fragment>
          <TakeawaysSection />
          <IntroductionSection />
          <FlexibilitySection />
          <SimplifiedApiStructureSection />
          <PerformanceBenefitsSection />
          <ClientSideAdvantagesSection />
          <SecurityAndErrorHandlingSection />
          <UseCasesSection />
          <DrawbacksSection />
          <ComparingSection />
          <ConclusionSection />
          <FaqSection />
        </React.Fragment>
      }
    />
  )
}

export default WhyGraphQL
