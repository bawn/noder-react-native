//
//  RCTHtmlViewManager.m
//  Noder
//
//  Created by bawn on 07/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "RCTHtmlViewManager.h"
#import "RCTHtmlView.h"

#import <React/RCTBridge.h>
#import <React/RCTUtils.h>
#import <React/RCTUIManager.h>
#import <React/UIView+React.h>

@implementation RCTHtmlViewManager

RCT_EXPORT_MODULE()

- (UIView *)view{
  RCTHtmlView *view = [[RCTHtmlView alloc] init];
  return view;
}

RCT_EXPORT_VIEW_PROPERTY(content, NSString)
RCT_EXPORT_VIEW_PROPERTY(onChange, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onClickUserLink, RCTDirectEventBlock)



@end



