import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const GuidelinesPage = () => {
  return (
    <div className="prose mx-auto mt-24 max-w-[640px]">
      <div className="fixed right-4 top-4">
        <Link href="/">
          <X size={40} />
        </Link>
      </div>
      <h1 className="font-serif text-4xl">Guidelines</h1>
      <div>
        <p>
          Fillaneed is an open-ended platform that can be used however a user
          may see fit. These guidelines are intended to protect Fillaneed
          members from harmful behavior without undue restrictions on the types
          of content and behavior allowed on the platform.
        </p>
        <h4>Unacceptable content</h4>
        <ul>
          <li>Illegal content, per U.S. law</li>
          <li>Defamation</li>
          <li>Copyright infringement</li>
          <li>Violent or sexually suggestive content involving minors</li>
          <li>Gore and violent mutilation of any kind</li>
          <li>
            Spam or advertising (includes bulk uploading, using Are.na for the
            sole purpose of promoting a business, soliciting transactions of any
            kind, posting links and domain names primarily for SEO impact, and
            posting links to phishing or malware sites)
          </li>
        </ul>
        <h4>Unacceptable behavior</h4>
        <ul>
          <li>
            <strong>Harassment</strong>
            <br />
            Includes emotional abuse, coercion, sustained and/or graphic sexual
            advances, or threats of any kind
          </li>
          <li>
            <strong>Hate speech and discrimination</strong>
            <br />
            Includes speech, slurs, imagery, or symbolism intended to promote
            violence, hatred, or discrimination based on race, sexuality, gender
            identity, religion, ethnic or national origin, age, disability, or
            any other characteristic. Content collected for research or archival
            purposes that may violate the above guidelines should be accompanied
            by a verbal disclaimer.
          </li>
          <li>
            <strong>Incitement</strong>
            <br />
            Includes threats of harm, any celebration or promotion of violence,
            incitement or participation in bullying, brigading, or mobbing on or
            outside Are.na.
          </li>
          <li>
            <strong>Impersonating another person or user </strong>
          </li>
          <li>
            <strong>Promoting any form of self-harm</strong>
          </li>
          <li>
            <strong>
              Posting anyone’s personal information or private content without
              consent
            </strong>
          </li>
        </ul>
        <h4>Copyright Infringements</h4>
        <p>
          A proper DMCA notice must be filed for any moderating actions to take
          place. In the case that a complaint is filed, the content in question
          will be assessed and, if found to violate DMCA protections, removed.
          Users who are found to have uploaded violating content will be
          provided with information surrounding the complaint, and will have the
          opportunity to file a DMCA counter-notice of their own.
        </p>
      </div>
    </div>
  );
};

export default GuidelinesPage;
