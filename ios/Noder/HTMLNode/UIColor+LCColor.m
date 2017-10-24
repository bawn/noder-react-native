//
//  UIColor+LCColor.m
//  Noder
//
//  Created by bawn on 07/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "UIColor+LCColor.h"


static inline UIColor * RGB(CGFloat r, CGFloat g, CGFloat b) {
  return [UIColor colorWithDisplayP3Red:(r)/255.0f green:(g)/255.0f blue:(b)/255.0f alpha:1.0f];
}



@implementation UIColor (LCColor)


+ (UIColor *)lcBlackColor{
  return RGB(66.0f, 66.0f, 66.0f);
}

+ (UIColor *)lcGrayColor{
  return RGB(171.0f, 171.0f, 171.0f);
}


+ (UIColor *)lcBlueColor{
  return RGB(74.0f, 144.0f, 226.0f);
}


+ (UIColor *)lcCodeGrayColor{
  return RGB(247.0f, 247.0f, 247.0f);
}

+ (UIColor *)lcQuoteGrayColor{
  return RGB(238.0f, 238.0f, 238.0f);
}

+ (UIColor *)lcPlaceholdColor{
  return RGB(244.0f, 244.0f, 244.0f);
}


@end
