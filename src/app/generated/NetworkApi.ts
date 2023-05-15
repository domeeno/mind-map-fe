/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateSubjectDTO {
  userId?: string;
  subjectName: string;
  description?: string;
  rootTopic: string;
  tags: string[];
}

export interface SubjectDTO {
  id: string;
  subjectName: string;
  userId?: string;
  description?: string;
  rootTopic: string;
  tags: string[];
  /** @format int32 */
  likes: number;
  /** @format int32 */
  saves: number;
  /** @format date-time */
  createTimestamp: string;
  /** @format date-time */
  updateTimestamp: string;
}

export interface TopicDTO {
  id: string;
  type: "ROOT" | "TOPIC" | "DOCUMENT";
  color:
    | "APP_DEFAULT"
    | "USER_DEFAULT"
    | "TEAL"
    | "MAROON"
    | "PURPLE"
    | "OLIVE"
    | "NAVY"
    | "GRAY"
    | "SILVER";
  weight: "XS" | "LIGHT" | "MEDIUM" | "HEAVY" | "XL" | "ROOT";
  tags: string[];
  subjectId: string;
  parentIds: string[];
  childIds: string[];
  userId?: string;
  topicName: string;
  documentId?: string;
}

export interface SubjectSearchDTO {
  subjectId: string;
  subjectName: string;
  description?: string;
  tags: string[];
}
